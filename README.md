# ms-challenge-v2

Change port run cont aws + env

Terraform setup

```bash
  terraform apply -var-file=prod.tfvars
```

Pull img from hub

```bash
  sudo docker pull danlevypro/products:1.0
```

Run container

```bash
  sudo docker run -p 80:3002 --name products_c -t -d danlevypro/products:1.0
```
