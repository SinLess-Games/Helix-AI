variable "cloudinit_template_name" {
    type = string
}

variable "proxmox_node" {
    type = string
}

variable "ssh_key" {
  type = string
  sensitive = true
}

##################################################################################
# LOCALS
##################################################################################

locals {
  buildtime = formatdate("MM-DD-YYYY hh:mm ZZZ", timestamp())
}

resource "proxmox_vm_qemu" "k8s-masters" {
  count = 3
  name = "k8s-master-${count.index + 1}"
  vmid = 200 + count.index
  desc = "Kubernetes Master Node${count.index + 1}, created by Terraform on ${local.buildtime}"
  target_node = var.proxmox_node
  clone = var.cloudinit_template_name
  full_clone = true
  onboot = true
  agent = 1
  os_type = "cloud-init"
  cores = 4
  sockets = 1
  cpu = "host"
  memory = 8192
  scsihw = "virtio-scsi-pci"
  bootdisk = "scsi0"
  hastate = "started"
  vm_state = "running"
  pool = "k8s-masters"

  disks {
    scsi {
      scsi0 {
        cloudinit {
            storage = "Group_4"
        }
      }

      scsi1 {
        disk {
          size = "100G"
          emulatessd = true
          storage = "Group_1"
        }
      }
    }
  }

  network {
    model = "virtio"
    bridge = "vmbr0"
    queues = 4
  }

  lifecycle {
    ignore_changes = [
      network,
    ]
  }

  ipconfig0 = "ip=192.168.86.${100 + count.index}/24,gw=192.168.86.1"
  searchdomain = "k8s_master_${count.index + 1}.local.sinlessgamesllc.com"
  nameserver = "1.1.1.1"

  ssh_user = "sinless777"
  sshkeys = <<EOF
  ${var.ssh_key}
  EOF

}

resource "proxmox_vm_qemu" "k8s-workers" {
  count = 4
  name = "k8s-worker-${count.index + 1}"
  vmid = 250 + count.index
  desc = "Kubernetes Worker Node ${count.index + 1}, created by Terraform on ${local.buildtime}"
  target_node = var.proxmox_node
  clone = var.cloudinit_template_name
  full_clone = true
  pool = "k8s-workers"
  onboot = true
  agent = 1
  os_type = "cloud-init"
  cores = 4
  sockets = 1
  cpu = "host"
  memory = 8192
  scsihw = "virtio-scsi-pci"
  bootdisk = "scsi0"
  hastate = "started"
  vm_state = "running"

  disks {
    scsi {
      scsi0 {
        cloudinit {
          storage = "Group_4"
        }
      }

      scsi1 {
        disk {
          size = "100G"
          emulatessd = true
          storage = "Group_2"
        }
      }
    }
  }

  network {
    model = "virtio"
    bridge = "vmbr0"
    firewall = true
    queues = 4
  }

  lifecycle {
    ignore_changes = [
      network,
    ]
  }

  ipconfig0 = "ip=192.168.86.${150 + count.index}/24,gw=192.168.86.1"
  searchdomain = "k8s_worker_${count.index + 1}.local.sinlessgamesllc.com"
  nameserver = "1.1.1.1"

  ssh_user = "sinless777"
  sshkeys = <<EOF
  ${var.ssh_key}
  EOF

}
