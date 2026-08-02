import os

def generate_directory_tree(start_directory, excluded_folders, output_filename):
    with open(output_filename, 'w', encoding='utf-8') as file_handle:
        for root, directories, files in os.walk(start_directory):
            directories[:] = [d for d in directories if d not in excluded_folders]
            depth = root.replace(start_directory, '').count(os.sep)
            indentation = ' ' * 4 * depth
            file_handle.write(f'{indentation}{os.path.basename(root)}/\n')
            file_indentation = ' ' * 4 * (depth + 1)
            for filename in files:
                file_handle.write(f'{file_indentation}{filename}\n')

if __name__ == "__main__":
    folders_to_exclude = ['node_modules', '.git', '__pycache__', 'venv', '.vscode']
    generate_directory_tree('.', folders_to_exclude, 'MyStructure.txt')
