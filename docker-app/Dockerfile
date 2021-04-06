FROM continuumio/miniconda

RUN apt-get update
RUN apt-get install -y software-properties-common

RUN apt-get install -y vim.tiny  

RUN mkdir -p /usr/workdir/project
WORKDIR /usr/workdir

# helper aliases
RUN echo 'alias ll="ls -ls"' >> ~/.bashrc
RUN echo 'alias vim="vim.tiny"' >> ~/.bashrc

RUN conda init bash

RUN conda create -y --name venv -c conda-forge \
                    r-essentials\
                    python=3.6\
                    pip

# activate the env
RUN echo "conda activate venv" >> ~/.bashrc
ENV PATH="/opt/conda/envs/venv/bin:${PATH}"

RUN pip install --no-cache-dir google-cloud-firestore \
                                pyrebase4 \
                                google-auth

# new
COPY run_workflow.sh execute_files.py file_util.py get_and_exec.py ./
RUN ["chmod", "+x", "run_workflow.sh"]

ARG DEP="ggplot gridExtra"
ARG R_VER=3.6
ARG PROJECT_REF

ENV PROJECT_REF=${PROJECT_REF}

RUN echo $R_VER
RUN for i in $DEP; do echo "\"$i\""; done
#RUN R -e "install.packages(littler,dependencies=TRUE, repos='http://cran.rstudio.com/')"
#RUN for i in $DEP; do R -e "install.packages($i,dependencies=TRUE, repos='http://cran.rstudio.com/')"; done
#RUN conda install -y --name venv r=${R_VER}
# ggplot2 gridExtra dplyr
# Originally in the file: 
#RUN conda install -y --name venv r=${R_VER}
#RUN for i in $DEP; do R -e "install.packages(`echo "'$i'"`,dependencies=TRUE, repos='http://cran.rstudio.com/')"; done
RUN for i in $DEP; do conda install -c conda-forge `echo "$i"`; done
ENTRYPOINT sh run_workflow.sh