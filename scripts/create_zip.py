import os
import zipfile

def create_project_zip():
    os.makedirs('public', exist_ok=True)
    zip_path = os.path.join('public', 'agrivision-project.zip')
    
    ignore_dirs = {'node_modules', '.git', 'dist', '.cache', '__pycache__'}
    ignore_extensions = {'.pyc', '.log'}
    
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk('.'):
            # Prune ignored directories
            dirs[:] = [d for d in dirs if d not in ignore_dirs and not d.startswith('.')]
            
            for file in files:
                if file == 'agrivision-project.zip' or file.endswith('.zip'):
                    continue
                if any(file.endswith(ext) for ext in ignore_extensions):
                    continue
                
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, '.')
                if rel_path.startswith('./'):
                    rel_path = rel_path[2:]
                
                # Do not include anything in node_modules or dist
                if any(part in ignore_dirs for part in rel_path.split(os.sep)):
                    continue
                    
                zipf.write(full_path, rel_path)
                
    print(f"Created {zip_path} with size: {os.path.getsize(zip_path)} bytes")

if __name__ == '__main__':
    create_project_zip()
