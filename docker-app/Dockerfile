FROM continuumio/miniconda

ARG R_VER
RUN echo $R_VER
RUN apt-get update
RUN apt-get install -y software-properties-common

RUN apt-get install -y vim.tiny  

RUN mkdir -p /usr/workdir
WORKDIR /usr/workdir

# helper aliases
RUN echo 'alias ll="ls -ls"' >> ~/.bashrc
RUN echo 'alias vim="vim.tiny"' >> ~/.bashrc

RUN conda init bash

# create env and install R 
RUN conda create -y --name venv -c conda-forge \
                    r=${R_VER}\
                    r-essentials
 RUN conda install -y --name venv python=3.6 \
                                  pip

# activate the env
RUN echo "conda activate venv" >> ~/.bashrc
ENV PATH="/opt/conda/envs/venv/bin:${PATH}"

COPY run_workflow.sh .
RUN ["chmod", "+x", "run_workflow.sh"]
COPY execute_files.py .

RUN echo "for(i in 1:10) {print(i)}" > users_code.R
RUN echo "import abc" > users_code2.R

ENTRYPOINT sh run_workflow.sh
