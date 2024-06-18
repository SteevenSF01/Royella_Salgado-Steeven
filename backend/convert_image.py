import os
import base64

def convert_image_to_base64(image_path):
    with open(image_path, 'rb') as image_file:
        base64_image = base64.b64encode(image_file.read()).decode('utf-8')
    return base64_image

if __name__ == '__main__':
    # Obtén la ruta absoluta del archivo inner-logo.png
    base_dir = os.path.dirname(os.path.abspath(__file__))
    image_path = os.path.join(base_dir, 'static', 'images', 'inner-logo.png')
    
    # Convierte y muestra la imagen en base64
    base64_image = convert_image_to_base64(image_path)
    print(base64_image)
