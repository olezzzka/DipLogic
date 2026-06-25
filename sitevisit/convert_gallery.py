import cv2
import os

# Paths to the generated images in the brain directory
sources = {
    "clay_vase_earthy": "C:\\Users\\Oleg\\.gemini\\antigravity\\brain\\0ff77805-d616-4cb1-be49-562b1065070c\\clay_vase_earthy_1782402423182.png",
    "clay_bowl_moss": "C:\\Users\\Oleg\\.gemini\\antigravity\\brain\\0ff77805-d616-4cb1-be49-562b1065070c\\clay_bowl_moss_1782402435789.png",
    "clay_cup_porcelain": "C:\\Users\\Oleg\\.gemini\\antigravity\\brain\\0ff77805-d616-4cb1-be49-562b1065070c\\clay_cup_porcelain_1782402447327.png"
}

output_dir = os.path.join("public", "images")
os.makedirs(output_dir, exist_ok=True)

for name, src_path in sources.items():
    if not os.path.exists(src_path):
        print(f"Error: Source file does not exist: {src_path}")
        continue
        
    img = cv2.imread(src_path)
    if img is None:
        print(f"Error: Could not read image: {src_path}")
        continue
        
    # Resize slightly to a web-friendly size (e.g. max dimension 800px)
    h, w = img.shape[:2]
    max_dim = 800
    if max(h, w) > max_dim:
        if h > w:
            new_h = max_dim
            new_w = int(w * (max_dim / h))
        else:
            new_w = max_dim
            new_h = int(h * (max_dim / w))
        img = cv2.resize(img, (new_w, new_h), interpolation=cv2.INTER_AREA)
        print(f"Resized {name} to {new_w}x{new_h}")
        
    out_path = os.path.join(output_dir, f"{name}.webp")
    # Convert and save as WebP with high quality (85%)
    cv2.imwrite(out_path, img, [cv2.IMWRITE_WEBP_QUALITY, 85])
    size_kb = os.path.getsize(out_path) / 1024.0
    print(f"Saved optimized web image: {out_path} ({size_kb:.2f} KB)")
