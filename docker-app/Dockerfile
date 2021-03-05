FROM continuumio/miniconda

ARG R_VER=3.6
ARG PROJECT_REF

ENV PROJECT_REF=${PROJECT_REF}

RUN echo $R_VER
RUN apt-get update
RUN apt-get install -y software-properties-common

RUN apt-get install -y vim.tiny  

RUN mkdir -p /usr/workdir/project
WORKDIR /usr/workdir

# helper aliases
RUN echo 'alias ll="ls -ls"' >> ~/.bashrc
RUN echo 'alias vim="vim.tiny"' >> ~/.bashrc

RUN conda init bash

# create env and install R 
RUN conda create -y --name venv -c conda-forge \
                    r=${R_VER}\
                    r-essentials\
                    python=3.6\
                    pip
# RUN conda install -y --name venv python=3.6 \
#                                   pip

# activate the env
RUN echo "conda activate venv" >> ~/.bashrc
ENV PATH="/opt/conda/envs/venv/bin:${PATH}"

RUN pip install --no-cache-dir google-cloud-firestore \
                                pyrebase4 \
                                google-auth

COPY run_workflow.sh execute_files.py file_util.py get_and_exec.py ./

RUN ["chmod", "+x", "run_workflow.sh"]

ENTRYPOINT sh run_workflow.sh 
