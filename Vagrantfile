$script = <<-SHELL
  sudo apt update
  sudo apt install -y ca-certificates curl gnupg

  sudo install -m 0755 -d /etc/apt/keyrings

  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
    sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

  sudo chmod a+r /etc/apt/keyrings/docker.gpg

  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

  sudo apt update

  sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

  cd /vagrant
  sudo docker build -t gc2-api-filme .
  sudo docker run -d -p 3000:3000 --env-file .env gc2-api-filme
SHELL

Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/bionic64"

  config.vm.define :vm1 do |vm1|
    vm1.vm.network :private_network, :ip => "192.168.33.10"
  end

  config.vm.define :vm2 do |vm2|
    vm2.vm.network :private_network, :ip => "192.168.33.11"
    vm2.vm.provision :shell, inline: $script
  end

  config.vm.provider "virtualbox" do |vb|
    vb.gui = false
    vb.memory = "1024"
  end

  config.vm.synced_folder "./data", "/vagrant_data"
end
