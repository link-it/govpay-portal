#!/bin/bash

function printHelp() {
echo "Usage $(basename $0) [ -t <repository>:<tagname> | <Installer Sorgente> | <Personalizzazioni> | -h ]"
echo
echo "Options
-t <TAG>       : Imposta il nome del TAG ed il repository locale utilizzati per l'immagine prodotta
                 NOTA: deve essere rispettata la sintassi <repository>:<tagname>
-h             : Mostra questa pagina di aiuto

Sorgente:
-v <VERSIONE>  : Imposta la versione della release da utilizzare per il build (default: ${LATEST_GOVPAY_PORTAL_RELEASE})
-l <DIR>       : Usa una directory locale contenente i file della build Angular (contenuto di dist/govpay-portal/browser)

Personalizzazioni:
-e <PATH>      : Imposta il path interno utilizzato per i file dell'applicazione
-f <PATH>      : Imposta il path interno utilizzato per i log di nginx

"
}

DOCKERBIN="$(which docker)"
if [ -z "${DOCKERBIN}" ]
then
   echo "Impossibile trovare il comando \"docker\""
   exit 2
fi



TAG=
VER=
LOCALDIR=

REGISTRY_PREFIX=linkitaly
#REGISTRY_PREFIX=localhost

LATEST_LINK="$(curl -qw '%{redirect_url}\n' https://github.com/link-it/govpay-portal/releases/latest 2> /dev/null)"
LATEST_GOVPAY_PORTAL_RELEASE="${LATEST_LINK##*/}"

while getopts "ht:v:l:e:f:" opt; do
  case $opt in
    t) TAG="$OPTARG"; NO_COLON=${TAG//:/}
      [ ${#TAG} -eq ${#NO_COLON} -o "${TAG:0:1}" == ':' -o "${TAG:(-1):1}" == ':' ] && { echo "Il tag fornito \"$TAG\" non utilizza la sintassi <repository>:<tagname>"; exit 2; } ;;
    v) VER="$OPTARG"  ;;
    l) LOCALDIR="$OPTARG"
        [ ! -d "${LOCALDIR}" ] && { echo "La directory indicata non esiste o non e' raggiungibile [${LOCALDIR}]."; exit 3; }
       ;;
    e) CUSTOM_GOVPAY_HOME="${OPTARG}" ;;
    f) CUSTOM_GOVPAY_LOG="${OPTARG}" ;;
    h) printHelp
       exit 0
            ;;
        \?)
      echo "Opzione non valida: -$opt"
      exit 1
            ;;
    esac
done


rm -rf buildcontext
mkdir -p buildcontext/
cp -fr commons buildcontext/

DOCKERBUILD_OPT=()
DOCKERBUILD_OPTS=(${DOCKERBUILD_OPTS[@]} '--build-arg' "govpay_portal_fullversion=${VER:-${LATEST_GOVPAY_PORTAL_RELEASE}}")
[ -n "${CUSTOM_GOVPAY_HOME}" ] && DOCKERBUILD_OPTS=(${DOCKERBUILD_OPTS[@]} '--build-arg' "govpay_portal_home=${CUSTOM_GOVPAY_HOME}")
[ -n "${CUSTOM_GOVPAY_LOG}" ] && DOCKERBUILD_OPTS=(${DOCKERBUILD_OPTS[@]} '--build-arg' "govpay_portal_log=${CUSTOM_GOVPAY_LOG}")

# Build immagine
if [ -n "${LOCALDIR}" ]
then
  DOCKERFILE="govpay-portal/Dockerfile.daFile"
  cp -rf "${LOCALDIR}"/* buildcontext/app/
else
  DOCKERFILE="govpay-portal/Dockerfile.github"
fi


# Build imagine govpay-portal

if [ -z "$TAG" ]
then
    REPO=${REGISTRY_PREFIX}/govpay-portal
  TAGNAME=${VER:-${LATEST_GOVPAY_PORTAL_RELEASE}}
  TAG="${REPO}:${TAGNAME}"
fi



"${DOCKERBIN}" build "${DOCKERBUILD_OPTS[@]}" \
  -t "${TAG}" \
  -f ${DOCKERFILE} buildcontext
RET=$?
[ ${RET} -eq  0 ] || exit ${RET}

exit 0
