FROM continuumio/miniconda3

RUN apt-get update \
    && apt-get install -y wget \ 
    software-properties-common \
    vim.tiny

# RUN apt-get install -y software-properties-common

# RUN apt-get install -y vim.tiny  

RUN mkdir -p /usr/workdir/project
WORKDIR /usr/workdir

# helper aliases
RUN echo 'alias ll="ls -ls"' >> ~/.bashrc
RUN echo 'alias vim="vim.tiny"' >> ~/.bashrc

RUN conda init bash

RUN conda install mamba -y --name base -c conda-forge

RUN mamba create -y --name venv -c conda-forge \
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

ARG DEP="ggplot2 gridExtra dplyr"
ARG R_VER=3.6
ARG PROJECT_REF

ENV PROJECT_REF=${PROJECT_REF}

RUN echo $R_VER
RUN for i in $DEP; do echo "\"r-$i\""; done
RUN mamba install -y --name venv -c conda-forge r=${R_VER}
RUN for i in $DEP; do mamba install -y -c conda-forge --name venv --no-update-deps `echo "r-$i"`; done
#RUN R -e "install.packages(littler,dependencies=TRUE, repos='http://cran.rstudio.com/')"
# RUN for i in $DEP; do R -e "install.packages(\"$i\",dependencies=TRUE, repos='http://cran.rstudio.com/', quiet=TRUE)"; done
#RUN conda install -y --name venv r=${R_VER}
# ggplot2 gridExtra dplyr
# Originally in the file: 
#RUN conda install -y --name venv r=${R_VER}
#RUN for i in $DEP; do R -e "install.packages(`echo "'$i'"`,dependencies=TRUE, repos='http://cran.rstudio.com/')"; done

ENTRYPOINT sh run_workflow.sh
