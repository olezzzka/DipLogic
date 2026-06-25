import cv2
import os
import numpy as np

def main():
    video_path = "Clay_morphs_into_vase_1080p_202606251829.mp4"
    output_dir = os.path.join("public", "frames")
    
    # Create output directory
    os.makedirs(output_dir, exist_ok=True)
    
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"Error: Could not open video file {video_path}")
        return
        
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    print(f"Video opened successfully. Total frames: {total_frames}")
    
    # We want exactly 180 frames
    target_frame_count = 180
    frame_indices = np.linspace(0, total_frames - 1, target_frame_count).astype(int)
    
    # Dimensions to resize to
    target_width = 1600
    target_height = 900
    
    frame_count = 0
    size_limit_bytes = 50 * 1024  # 50 KB
    
    sizes = []
    
    print(f"Extracting and compressing {target_frame_count} frames to {output_dir}...")
    
    for i, idx in enumerate(frame_indices, 1):
        cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
        ret, frame = cap.read()
        if not ret:
            print(f"Warning: Could not read frame at index {idx}")
            continue
            
        # Resize frame to 1600x900 using high-quality cubic interpolation
        resized_frame = cv2.resize(frame, (target_width, target_height), interpolation=cv2.INTER_AREA)
        
        # Save as WebP with dynamic quality adjustment
        filename = f"frame_{i:03d}.webp"
        filepath = os.path.join(output_dir, filename)
        
        quality = 75
        while quality >= 20:
            # cv2.IMWRITE_WEBP_QUALITY ranges from 1 to 100
            cv2.imwrite(filepath, resized_frame, [cv2.IMWRITE_WEBP_QUALITY, quality])
            file_size = os.path.getsize(filepath)
            
            if file_size <= size_limit_bytes:
                sizes.append(file_size)
                break
            else:
                quality -= 5  # Lower quality by 5% and try again
                
        if quality < 20:
            print(f"Warning: Frame {i} ({filename}) is {file_size/1024:.2f} KB even at quality {quality}!")
        else:
            if i % 10 == 0 or i == 1 or i == target_frame_count:
                print(f"Saved {filename} (from frame idx {idx}) - Quality: {quality}, Size: {file_size/1024:.2f} KB")
        
        frame_count += 1
        
    cap.release()
    
    if frame_count > 0:
        avg_size = sum(sizes) / len(sizes) / 1024.0
        max_size = max(sizes) / 1024.0
        min_size = min(sizes) / 1024.0
        print("\nCompression statistics:")
        print(f"  Total frames saved: {frame_count}")
        print(f"  Average file size: {avg_size:.2f} KB")
        print(f"  Max file size: {max_size:.2f} KB")
        print(f"  Min file size: {min_size:.2f} KB")
    else:
        print("Error: No frames were saved.")

if __name__ == "__main__":
    main()
