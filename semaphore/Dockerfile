FROM ansiblesemaphore/semaphore:v2.8.53

# upgrade terraform to 1.1.19
RUN wget https://releases.hashicorp.com/terraform/1.1.9/terraform_1.1.9_linux_amd64.zip
RUN unzip terraform_1.1.9_linux_amd64.zip && rm terraform_1.1.9_linux_amd64.zip
RUN mv terraform /usr/bin/terraform