import os
import re

def generate_product_code(image_folder_path, details_file):
    """
    Reads image filenames from a folder and links them with product details
    to generate a TypeScript array for the MOCK_PRODUCTS constant.
    """
    try:
        # Get all files with image extensions from the specified folder
        all_files = [f for f in os.listdir(image_folder_path) if f.endswith(('.jpg', '.jpeg', '.png'))]
        
        # Filter the list to include only files that start with a number, which is required for sorting.
        image_filenames = [f for f in all_files if re.match(r'^\d+', f)]

        if not image_filenames:
            return "Error: No image files starting with a number were found in the specified folder. Please check the folder and filenames."

        # Sort files numerically based on the number at the start of the filename
        image_filenames.sort(key=lambda x: int(re.match(r'(\d+)', x).group(1)))
        
        # Read and filter product detail lines
        with open(details_file, 'r') as f:
            details_lines = [line for line in f.readlines() if line.strip()]

    except FileNotFoundError:
        return f"Error: Could not find the directory or file. Please check your paths."
    except Exception as e:
        return f"An error occurred: {e}"

    if len(details_lines) != len(image_filenames):
        return (f"Error: Mismatch! Found {len(image_filenames)} images but {len(details_lines)} product details. "
                "Please ensure they are equal.")

    products_ts = "import type { Product } from './types';\n\n"
    products_ts += "export const MOCK_PRODUCTS: Product[] = [\n"

    brands = ["ONYX", "FRONTIER", "RUSTLER CO.", "METRO UOMO", "AURA", "VEXEL", "ECLAT", "ZENITH", "INDIGO THREADS", "BASICS+"]
    
    for i, (image_name, details_line) in enumerate(zip(image_filenames, details_lines)):
        parts = details_line.strip().split('\t') # Assuming tab-separated from spreadsheet
        if len(parts) < 5:
            parts = details_line.strip().split() # Fallback for space-separated
        
        product_id = f"p{i + 1}"
        
        # --- Data Extraction ---
        gender = parts[1].capitalize() if len(parts) > 1 else "Unisex"
        category = parts[2].replace('V', '').strip() if len(parts) > 2 else "Apparel"
        pattern = parts[4] if len(parts) > 4 else "Unique"
        color = parts[-1].capitalize() if len(parts) > 1 else "Multicolor"

        # --- Creative Naming & Description ---
        name = f"{pattern.replace('-', ' ')} {category}"
        try:
           name_parts_match = re.search(r'Include wr (.*?)(?=\s\w+$)', details_line)
           if name_parts_match:
               name_parts = name_parts_match.group(1).replace('`', '').strip()
               name = f"{name_parts} {category}"
        except (AttributeError, IndexError):
            pass

        description = f"A stylish {gender.lower()} {category.lower()} in {color.lower()}, featuring a striking {pattern.lower()} pattern."
        
        # --- Price and Brand ---
        price = 1299 + (i * 53 % 1700)
        original_price = price * 2
        brand = brands[i % len(brands)]

        product_entry = f"""  {{
    id: '{product_id}',
    brand: '{brand}',
    name: '{name.title()}',
    price: {price},
    originalPrice: {original_price},
    discount: '(50% OFF)',
    imageUrl: '/products/{image_name}',
    gender: '{gender}',
    category: '{category}',
    description: '{description}',
    sizes: ['S', 'M', 'L', 'XL'],
  }},\n"""
        products_ts += product_entry

    products_ts += "];\n"
    return products_ts

# --- Main Execution ---
if __name__ == "__main__":
    # IMPORTANT: The user needs to provide the path to their images folder here.
    # Example for Windows: "C:/Users/YourUser/Desktop/My_Images"
    # Example for Mac/Linux: "/Users/YourUser/Desktop/My_Images"
    
    images_path = "C:/Users/Nihal- Academics-JIO/Videos/jia_-your-conversational-search-assistant/public/products"
    
    if os.path.isdir(images_path):
        typescript_code = generate_product_code(images_path, 'product_details.txt')

        if "Error:" not in typescript_code:
                output_filename = 'generated_constants.ts'
                with open(output_filename, 'w', encoding='utf-8') as f:
                    f.write(typescript_code)
                print(f"\\n{'='*50}")
                print(f"Success! The generated code has been saved to '{output_filename}'.")
                print("You can now copy the content of this file into your 'src/constants.ts'.")
                print(f"{'='*50}\\n")
        else:
                # Print any error messages that occurred during generation
                print(f"\\n{'='*50}")
                print("An error occurred during code generation:")
                print(typescript_code)
                print(f"{'='*50}\\n")
    else:
        print("\\nError: The path you entered is not a valid folder. Please run the script again.")
