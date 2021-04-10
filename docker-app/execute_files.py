import glob

def execute_files(f):
    from subprocess import PIPE, CalledProcessError, check_call, Popen, TimeoutExpired

    # python file_name.py
    # Rscript file_name.R

    # creates new subprocess to execute R file as: "Rscript filename.R"
    p3 = Popen(['/opt/conda/envs/venv/bin/Rscript', f], \
        stdout=PIPE, stderr=PIPE, cwd="/usr/workdir/project/")
    res = ""

    try:
        # time limit for execution is one hour
        stdout, stderr = p3.communicate(timeout=3600)

        # if subprocess is not successful, it returns the error:
        if p3.returncode != 0:
            res = stderr.splitlines()[-5:-1]
            res = b' '.join(res)
            res_str = res.decode("utf-8") if type(res) is bytes else res
            import re
            ret =re.findall(r'(?:Error).*', res_str)
        else:
            # else returns success
            ret = "success"
    # or time limit exceeded
    except TimeoutExpired:
        p3.kill()
        stdout, stderr = p3.communicate()
        ret = "time limit exceeded"

    return ret


def main():

    # 1st step: collect all files
    list_of_r_files = glob.glob("*.R")
    list_of_r_files.extend(glob.glob('*.r'))


    # 2nd step: executes files
    for f in list_of_r_files:
        res = execute_files(f)
        print(f'FILENAME: {f.strip()}\nRESULT: {res}')

    # 3rd step: send results to the form
    # for a,b in results:
    #     socketIO.print(a, b)

if __name__ == "__main__":
    main()