VERSION = 0.2

SRC_DIR = src
BUILD_DIR = build

JS_FILES = ${SRC_DIR}/taskpaper.treeview.js\
 ${SRC_DIR}/taskpaper.panel.js\
 ${SRC_DIR}/jquery.fn.js\
 ${SRC_DIR}/taskpaperresults.js\
 ${SRC_DIR}/taskpaperitem.js\
 ${SRC_DIR}/taskpaper.control.item.js\
 ${SRC_DIR}/taskpaper.js

RELEASE_FILES = todo README changelog.txt GPL-license.txt MIT-license.txt
IMAGES = ${SRC_DIR}/images/*
CSS = ${SRC_DIR}/css/*
DIST = ${BUILD_DIR}/dist
IMAGES_DIST = ${DIST}/images
CSS_DIST = ${DIST}/css

PROJECT = jquery.taskpaper
WE = ${DIST}/${PROJECT}.js
WE_PACK = ${DIST}/${PROJECT}.pack.js
WE_ARCH = ../${PROJECT}-src-${VERSION}.tar.gz
WE_RELEASE = ../${PROJECT}-${VERSION}.tar.gz

MERGE = sed -e '1 s/^\xEF\xBB\xBF//' ${JS_FILES} > ${WE}
PACKER = perl -I${BUILD_DIR}/packer ${BUILD_DIR}/packer/jsPacker.pl -i ${WE} -o ${WE_PACK} -e62

all: archive

taskpaper:
	@@echo "Building" ${WE}
	@@if test -d ${DIST}; then echo ${DIST} " is okay" ; else mkdir ${DIST}; fi

	@@echo " - Merging files"
	@@${MERGE}

	@@echo ${WE} "Built"
	@@echo

pack: taskpaper
	@@echo "Building" ${WE_PACK}

	@@echo " - Compressing using Packer"
	@@${PACKER}

	@@echo ${WE_PACK} "Built"
	@@echo

archive: pack
	@@echo "Building" ${WE_RELEASE}
	 
	@@echo " - Cleaning CSS and images"
	@@if test -d ${IMAGES_DIST}; then rm -f ${IMAGES_DIST}/*; else mkdir ${IMAGES_DIST}; fi
	@@if test -d ${CSS_DIST}; then rm -f ${CSS_DIST}/*; else mkdir ${CSS_DIST}; fi
	@@echo " - Coping CSS and images"
	@@cp -R -f ${IMAGES} ${IMAGES_DIST}
	@@cp -R -f ${CSS} ${CSS_DIST}
	@@cp -f ${RELEASE_FILES} build/dist
	@@echo " - Creating release"
	@@tar -czf ${WE_RELEASE} build/dist

	@@echo "Building" ${WE_ARCH}

	@@echo " - Creating archive"
	@@rm -f ${WE_ARCH}
	@@tar --exclude '.DS_Store' -czf ${WE_ARCH} .



	
	

