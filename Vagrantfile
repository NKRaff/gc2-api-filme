Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-22.04"
  config.vm.boot_timeout = 600

  config.vm.provider "virtualbox" do |vb|
    vb.gui = false
    vb.memory = "1024"
  end

  config.vm.define :vm1 do |vm1|
    vm1.vm.network :private_network, :ip => "192.168.33.10"
    vm1.vm.provision :shell, inline: <<-SHELL
      sudo apt update
      sudo apt install -y ansible
    SHELL
  end

  config.vm.define :vm2 do |vm2|
    vm2.vm.network :private_network, :ip => "192.168.33.11"
    vm2.vm.synced_folder "./data", "/vagrant_data"
  end
end
