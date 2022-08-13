export SHORT_COMMIT=$(git log -1 --pretty="%H" | cut -b -8)
export DOCKER_IMAGE_VERSION="dev_${SHORT_COMMIT}"

docker build -t djmarret/bm-whatsapp-venon:${DOCKER_IMAGE_VERSION} -f Dockerfile .
docker tag djmarret/bm-whatsapp-venon:${DOCKER_IMAGE_VERSION} djmarret/bm-whatsapp-venon:latest
docker push djmarret/bm-whatsapp-venon:${DOCKER_IMAGE_VERSION}
docker push djmarret/bm-whatsapp-venon:latest