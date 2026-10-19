#!/bin/bash

function printHelp() {
echo "Usage $(basename $0) [ -t <repository>:<tagname> | <Installer Sorgente> | <Personalizzazioni> | -h ]"
echo
echo "Options
-t <TAG>       : Imposta il nome del TAG ed il repository locale utilizzati per l'immagine prodotta
                 NOTA: deve essere rispettata la sintassi <repository>:<tagname>
-h             : Mostra questa pagina di aiuto

Sorgente:
-v <VERSIONE>  : Versione con cui etichettare l'immagine (default: local)
-l <DIR>       : Directory locale con i file della build Angular (obbligatoria) (contenuto di dist/govpay-portal/browser)

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
DOCKERBUILD_OPTS=(${DOCKERBUILD_OPTS[@]} '--build-arg' "govpay_portal_fullversion=${VER:-local}")
[ -n "${CUSTOM_GOVPAY_HOME}" ] && DOCKERBUILD_OPTS=(${DOCKERBUILD_OPTS[@]} '--build-arg' "govpay_portal_home=${CUSTOM_GOVPAY_HOME}")
[ -n "${CUSTOM_GOVPAY_LOG}" ] && DOCKERBUILD_OPTS=(${DOCKERBUILD_OPTS[@]} '--build-arg' "govpay_portal_log=${CUSTOM_GOVPAY_LOG}")

# Build immagine
# L'immagine si costruisce solo dalla build Angular locale: Dockerfile.github,
# che scaricava un tar.gz dalla release, e' stato rimosso perche' il repository
# non pubblica quell'asset (link-it/govpay-portal#180).
if [ -z "${LOCALDIR}" ]
then
  echo "Indicare con -l la directory della build Angular (es. dist/govpay-portal/browser)."
  exit 3
fi
DOCKERFILE="govpay-portal/Dockerfile.daFile"
mkdir -p buildcontext/app
cp -rf "${LOCALDIR}"/* buildcontext/app/


# Build imagine govpay-portal

if [ -z "$TAG" ]
then
    REPO=${REGISTRY_PREFIX}/govpay-portal
  TAGNAME=${VER:-local}
  TAG="${REPO}:${TAGNAME}"
fi



"${DOCKERBIN}" build "${DOCKERBUILD_OPTS[@]}" \
  -t "${TAG}" \
  -f ${DOCKERFILE} buildcontext
RET=$?
[ ${RET} -eq  0 ] || exit ${RET}

exit 0
