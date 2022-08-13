export SHORT_COMMIT=$(git log -1 --pretty="%H" | cut -b -8)
export DOCKER_IMAGE_VERSION="dev_${SHORT_COMMIT}"

docker build -t djmarret1992/bm-whatsapp-venon:${DOCKER_IMAGE_VERSION} -f Dockerfile .
docker tag djmarret1992/bm-whatsapp-venon:${DOCKER_IMAGE_VERSION} djmarret1992/bm-whatsapp-venon:latest
docker push djmarret1992/bm-whatsapp-venon:${DOCKER_IMAGE_VERSION}
docker push djmarret1992/bm-whatsapp-venon:latest