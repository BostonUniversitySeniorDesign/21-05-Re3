FROM lukasrosario/re3-base

ARG DEP="ggplot2 gridExtra dplyr"
ARG R_VER=3.6
ARG PROJECT_REF

RUN echo "conda activate venv-${R_VER}" >> ~/.bashrc
ENV PATH="/opt/conda/envs/venv-${R_VER}/bin:${PATH}"

ENV PROJECT_REF=${PROJECT_REF}
ENV R_VER=${R_VER}

RUN for i in $DEP; do mamba install -y -c conda-forge --name `echo "venv-$R_VER"` `echo "r-$i"`; done

ENTRYPOINT sh run_workflow.sh