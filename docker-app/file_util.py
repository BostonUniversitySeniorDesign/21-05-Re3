import urllib.request
import glob
from subprocess import Popen

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
            process = Popen(['wget', '--content-disposition', '-q', '-P', put_dir, file], shell=False)
            stdout, stderr = process.communicate(timeout=1800)

            if process.returncode != 0:
                print("error downloading file:", file)

        except Exception as e:
            print(e)
            print("error downloading file:", file)

    return 0


def find_files(workdir):
    list_of_r_files = glob.glob(f'{workdir}/*.R')
    list_of_r_files.extend(glob.glob(f'{workdir}/*.r'))

    return list_of_r_files