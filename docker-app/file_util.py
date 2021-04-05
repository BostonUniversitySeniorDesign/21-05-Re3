import urllib.request

def get_filenames(db_client, project_ref):
    
    doc_ref = db_client.document(project_ref)

    doc = doc_ref.get().to_dict()
    files = doc["URL"]

    return files
  

def fetch_files(file_list, put_dir):
    #project_path = f"projects/id_{project_id}"

    files_to_exec = []

    for i, file in enumerate(file_list):
        try:
            print("downloading file:", file)
            #storage_client.child(f"{project_path}/{file}").download(put_dir, file)
            location = f"{put_dir}/file{i + 1}.r"
            urllib.request.urlretrieve(file, location)
            files_to_exec.append(location)
        except Exception as e:
            print(e)
            print("error downloading file:", file)

    return files_to_exec