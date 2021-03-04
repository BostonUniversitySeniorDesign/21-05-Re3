def get_filenames(db_client, project_id):
    
    doc_ref = db_client.document(project_id)

    doc = doc_ref.get().to_dict()
    files = doc["URL"]

    return files
  

def fetch_files(storage_client, project_id, file_list, put_dir):
    project_path = f"projects/id_{project_id}"

    for file in file_list:
        try:
            print("downloading file:", file)
            storage_client.child(f"{project_path}/{file}").download(put_dir, file)
        except Exception as e:
            print(e)
            print("error downloading file:", file)