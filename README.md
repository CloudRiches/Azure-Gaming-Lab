#  Azure Gaming Lab
本次練習以用戶使用 Azure DevOps 部署至 Azure Kubernetes Service 進行 Continuous Integration Continuous Delivery (CI/CD)作為情境。在練習中將會使用Node.js Express框架並連接 Azure Database for MySQL建立一個網頁應用程式，該網頁應用程式以Docker Container的形式部署於 Azure Container Registry (ACR) 與 Azure Kubernetes Service (AKS) 並藉由 Azure DevOps Pipeliner 將流程自動化，從而使用戶只需將 souce code 推送至 Azure DevOps Repository 即可自動完成後續部署。

本次練習將會使用到以下

Azure 服務：
* Azure Kubernetes Service (AKS)
* Azure Container Registry (ACR)
* Azure DevOps Repository & Pipeline
* Azure Database for MySQL

*建立 Azure 服務皆為透過 Azure Portal*

其他工具：
* Git
* Visual Studio Code
* Node.js
* Express 產生器
* MySQL Workbench




本次練習將依序進行以下步驟
* [事前準備](./0_Prework.md)：環境建置與工具安裝
* [步驟一](./1_AKS.md)：建立 Azure Kubernetes Service (AKS)
* [步驟二](./2_ACR%20copy.md)：建立 Azure Container Registry (ACR)
* [步驟三](./3_MySQL.md)：建立 Azure Database for MySQL
* [步驟四](./4_CreateProject.md)：建立 Azure DevOps Repository 與 Node.js Express 專案
* [步驟五](./5_Coding.md)：撰寫程式碼
* [步驟六](./6_PipelineDeploy.md)：建立Azure DevOps Pipeline 部署至Azure Kubernetes Service (AKS)
* [步驟七](./7_CICD.md)：修改 source code 觸發 CI/CD