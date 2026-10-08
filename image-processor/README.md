# Arquitectura Serverless de Procesamiento de Imágenes

Este repositorio contiene la Infraestructura como Código (IaC) para desplegar un sistema de procesamiento de imágenes en AWS utilizando **Terraform**. El proyecto gestiona el ciclo de vida de los recursos a través de múltiples entornos de trabajo.

## 🛠️ Tecnologías y Servicios AWS Utilizados
* **Terraform:** Aprovisionamiento y gestión de estados mediante *Workspaces*.
* **Amazon S3:** Almacenamiento de imágenes con buckets dinámicos por entorno (sufijo `lujan-upao-v2`).
* **Amazon SQS:** Sistema de colas (`image-queue`) para desacoplar la carga de imágenes de su procesamiento.
* **AWS Lambda:** Funciones serverless para la subida y recorte de imágenes (`upload-lambda`, `crop-lambda`).
* **Amazon API Gateway:** Exposición de endpoints RESTful.
* **AWS IAM:** Gestión de roles y políticas de seguridad.

## 🌍 Entornos Desplegados
La infraestructura está diseñada para ser replicable de forma aislada mediante Terraform Workspaces:
1. `dev` (Desarrollo)
2. `qa` (Pruebas)
3. `prod` (Producción)

## 🚀 Comandos de Despliegue
Para replicar esta infraestructura, asegúrate de tener configurado AWS CLI mediante SSO y ejecuta:

```bash
terraform init
terraform workspace select dev || terraform workspace new dev
terraform apply -auto-approve
```
👨‍💻 Autor
Rony Fabrizio Luján Holguín

Universidad Privada Antenor Orrego (UPAO)

Estudiante de Ingeniería de Sistemas