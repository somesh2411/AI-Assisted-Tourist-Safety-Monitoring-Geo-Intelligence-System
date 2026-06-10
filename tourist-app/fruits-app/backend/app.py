from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torch.nn as nn
from transformers import ViTForImageClassification, ViTImageProcessor
from PIL import Image
import io
import base64
import numpy as np
import logging
from datetime import datetime
import uuid
from nutrition_data import nutrition_database
from recipe_data import recipe_database
from translations import translations

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Global variables for model
model = None
processor = None
device = None
class_mapping = ['Carrot', 'Potato', 'Radish', 'Tomato', 'Apple', 'Banana', 'Orange']

def load_model():
    """Load the trained ViT model"""
    global model, processor, device
    
    try:
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        logger.info(f"Using device: {device}")
        
        # Load ViT model with the correct number of labels
        model = ViTForImageClassification.from_pretrained(
            "google/vit-base-patch16-224",
            num_labels=7,
            ignore_mismatched_sizes=True
        )
        
        # Reinitialize classifier layer
        model.classifier = torch.nn.Linear(model.config.hidden_size, 7)
        
        # Load your trained weights (update path as needed)
        # For now, we'll use the pretrained model and fine-tune it
        # You would replace this with your actual model weights:
        # state_dict = torch.load("path_to_your_model.pth", map_location=device)
        # model.load_state_dict(state_dict, strict=False)
        
        model.to(device)
        model.eval()
        
        # Load image processor
        processor = ViTImageProcessor.from_pretrained("google/vit-base-patch16-224")
        
        logger.info("Model loaded successfully")
        return True
        
    except Exception as e:
        logger.error(f"Error loading model: {str(e)}")
        return False

def preprocess_image(image_data):
    """Preprocess image for model inference"""
    try:
        # Decode base64 image
        if isinstance(image_data, str):
            if image_data.startswith('data:image'):
                image_data = image_data.split(',')[1]
            image_bytes = base64.b64decode(image_data)
        else:
            image_bytes = image_data
            
        # Open image with PIL
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        
        # Process with ViT processor
        inputs = processor(images=image, return_tensors="pt").to(device)
        
        return inputs, image
        
    except Exception as e:
        logger.error(f"Error preprocessing image: {str(e)}")
        return None, None

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'model_loaded': model is not None})

@app.route('/classify', methods=['POST'])
def classify_image():
    """Classify uploaded image"""
    try:
        if 'image' not in request.json:
            return jsonify({'error': 'No image provided'}), 400
        
        if model is None:
            return jsonify({'error': 'Model not loaded'}), 500
        
        # Get image data
        image_data = request.json['image']
        
        # Preprocess image
        inputs, original_image = preprocess_image(image_data)
        if inputs is None:
            return jsonify({'error': 'Failed to process image'}), 400
        
        # Run inference
        with torch.no_grad():
            outputs = model(**inputs).logits
            softmax_scores = torch.nn.functional.softmax(outputs, dim=1)
            max_confidence, predicted_class = torch.max(softmax_scores, dim=1)
            
            max_confidence = max_confidence.item()
            predicted_class = predicted_class.item()
        
        # Get prediction results
        confidence_threshold = 0.7
        if max_confidence < confidence_threshold:
            predicted_label = "Unknown"
            confidence = max_confidence
        else:
            predicted_label = class_mapping[predicted_class]
            confidence = max_confidence
        
        # Generate unique scan ID
        scan_id = str(uuid.uuid4())
        
        # Prepare response
        result = {
            'scan_id': scan_id,
            'predicted_class': predicted_label,
            'confidence': round(confidence, 4),
            'timestamp': datetime.now().isoformat(),
            'all_predictions': {}
        }
        
        # Add all class probabilities
        for i, class_name in enumerate(class_mapping):
            result['all_predictions'][class_name] = round(softmax_scores[0][i].item(), 4)
        
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Error in classification: {str(e)}")
        return jsonify({'error': 'Classification failed'}), 500

@app.route('/nutrition/<item_name>', methods=['GET'])
def get_nutrition_info(item_name):
    """Get nutrition information for a food item"""
    try:
        lang = request.args.get('lang', 'en')
        
        # Normalize item name
        item_name_lower = item_name.lower()
        
        if item_name_lower in nutrition_database:
            nutrition_info = nutrition_database[item_name_lower].copy()
            
            # Add translated name if available
            if lang in translations and 'items' in translations[lang] and item_name_lower in translations[lang]['items']:
                nutrition_info['local_name'] = translations[lang]['items'][item_name_lower]
            
            return jsonify(nutrition_info)
        else:
            return jsonify({'error': 'Nutrition information not found'}), 404
            
    except Exception as e:
        logger.error(f"Error getting nutrition info: {str(e)}")
        return jsonify({'error': 'Failed to get nutrition information'}), 500

@app.route('/recipes/<item_name>', methods=['GET'])
def get_recipes(item_name):
    """Get recipes for a food item"""
    try:
        lang = request.args.get('lang', 'en')
        limit = int(request.args.get('limit', 5))
        
        # Normalize item name
        item_name_lower = item_name.lower()
        
        if item_name_lower in recipe_database:
            recipes = recipe_database[item_name_lower][:limit]
            
            # Add translations if available
            if lang in translations and 'recipes' in translations[lang]:
                for recipe in recipes:
                    recipe_id = recipe.get('id')
                    if recipe_id in translations[lang]['recipes']:
                        recipe.update(translations[lang]['recipes'][recipe_id])
            
            return jsonify({'recipes': recipes, 'total': len(recipes)})
        else:
            return jsonify({'recipes': [], 'total': 0})
            
    except Exception as e:
        logger.error(f"Error getting recipes: {str(e)}")
        return jsonify({'error': 'Failed to get recipes'}), 500

@app.route('/translate', methods=['POST'])
def translate_text():
    """Get translations for UI text"""
    try:
        data = request.json
        lang = data.get('lang', 'en')
        keys = data.get('keys', [])
        
        if lang not in translations:
            return jsonify({'error': 'Language not supported'}), 400
        
        result = {}
        for key in keys:
            if key in translations[lang]:
                result[key] = translations[lang][key]
            else:
                result[key] = key  # Fallback to key itself
        
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Error in translation: {str(e)}")
        return jsonify({'error': 'Translation failed'}), 500

@app.route('/search', methods=['GET'])
def search_items():
    """Search for items in nutrition database"""
    try:
        query = request.args.get('q', '').lower()
        lang = request.args.get('lang', 'en')
        
        if not query:
            return jsonify({'results': []})
        
        results = []
        for item_name, item_data in nutrition_database.items():
            if query in item_name:
                result_item = {
                    'name': item_name,
                    'display_name': item_name.title(),
                    'calories_per_100g': item_data.get('calories_per_100g', 0)
                }
                
                # Add translated name if available
                if lang in translations and 'items' in translations[lang] and item_name in translations[lang]['items']:
                    result_item['local_name'] = translations[lang]['items'][item_name]
                
                results.append(result_item)
        
        return jsonify({'results': results[:10]})  # Limit to 10 results
        
    except Exception as e:
        logger.error(f"Error in search: {str(e)}")
        return jsonify({'error': 'Search failed'}), 500

if __name__ == '__main__':
    logger.info("Starting Flask app...")
    
    # Load the model
    if not load_model():
        logger.error("Failed to load model. Please check model path and dependencies.")
        exit(1)
    
    app.run(debug=True, host='0.0.0.0', port=5000)