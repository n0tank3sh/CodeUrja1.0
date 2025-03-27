# providers.tf
terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.24.0"
    }
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

# persistent-volumes.tf
resource "kubernetes_persistent_volume_claim" "front-vol" {
  metadata {
    name = "front-vol"
  }
  spec {
    access_modes = ["ReadWriteOnce"]
    resources {
      requests = {
        storage = "1Gi"
      }
    }
  }
}

resource "kubernetes_persistent_volume_claim" "pgdata" {
  metadata {
    name = "pgdata"
  }
  spec {
    access_modes = ["ReadWriteOnce"]
    resources {
      requests = {
        storage = "5Gi"
      }
    }
  }
}

# db-deployment.tf
resource "kubernetes_deployment" "database" {
  metadata {
    name = "database"
    labels = {
      app = "database"
    }
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "database"
      }
    }
    template {
      metadata {
        labels = {
          app = "database"
        }
      }
      spec {
        container {
          image = "postgres:latest"
          name  = "database"
          env {
            name  = "POSTGRES_PASSWORD"
            value = "yourpassword"
          }
          volume_mount {
            name       = "pgdata"
            mount_path = "/var/lib/postgresql/data"
          }
        }
        volume {
          name = "pgdata"
          persistent_volume_claim {
            claim_name = kubernetes_persistent_volume_claim.pgdata.metadata[0].name
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "database-service" {
  metadata {
    name = "database-service"
  }
  spec {
    selector = {
      app = "database"
    }
    port {
      port        = 5432
      target_port = 5432
    }
  }
}

# backend-deployment.tf
resource "kubernetes_deployment" "backend" {
  metadata {
    name = "backend"
    labels = {
      app = "backend"
    }
  }
  spec {
    replicas = 2
    selector {
      match_labels = {
        app = "backend"
      }
    }
    template {
      metadata {
        labels = {
          app = "backend"
        }
      }
      spec {
        container {
          image = "your-backend-image:latest"
          name  = "backend"
          env {
            name  = "DATABASE_URL"
            value = "postgresql://user:password@database-service:5432/yourdb"
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "backend-service" {
  metadata {
    name = "backend-service"
  }
  spec {
    selector = {
      app = "backend"
    }
    port {
      port        = 8080
      target_port = 8080
    }
  }
}

# frontend-deployment.tf
resource "kubernetes_deployment" "frontend" {
  metadata {
    name = "frontend"
    labels = {
      app = "frontend"
    }
  }
  spec {
    replicas = 2
    selector {
      match_labels = {
        app = "frontend"
      }
    }
    template {
      metadata {
        labels = {
          app = "frontend"
        }
      }
      spec {
        container {
          image = "your-frontend-image:latest"
          name  = "frontend"
          volume_mount {
            name       = "front-vol"
            mount_path = "/app/data"
          }
        }
        volume {
          name = "front-vol"
          persistent_volume_claim {
            claim_name = kubernetes_persistent_volume_claim.front-vol.metadata[0].name
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "frontend-service" {
  metadata {
    name = "frontend-service"
  }
  spec {
    type = "LoadBalancer"
    selector = {
      app = "frontend"
    }
    port {
      port        = 80
      target_port = 3000
    }
  }
}

