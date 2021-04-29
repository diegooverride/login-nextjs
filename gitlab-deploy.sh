#!/bin/bash
while [[ $# -gt 0 ]]; do
    key="$1"
    case "$key" in
        -h|--host)
        shift
        HOST="$1"
        ;;
        -po|--port)
        shift
        PORT="$1"
        ;;
        -u|--user)
        shift
        USER="$1"
        ;;
        -p|--pass)
        shift
        PASS="$1"
        ;;
        -g|--group)
        shift
        GROUP="$1"
        ;;
        -pr|--project)
        shift
        PROJECT="$1"
        ;;
        *)
        # Do whatever you want with extra options
        echo "Unknown option '$key'"
        ;;
    esac
    # Shift after checking all the cases to get the next option
    shift
done

apt-get update
apt-get install sshpass -y
tar -czvf ${GROUP}.tar.gz ./
export SSHPASS=${PASS}

echo "Deploy project on server ${HOST}"
sshpass -e scp -P ${PORT} -o stricthostkeychecking=no -r ${GROUP}.tar.gz ${USER}@${HOST}:/home/poc5/${PROJECT}
sshpass -e ssh -p ${PORT} -o stricthostkeychecking=no ${USER}@${HOST} tar zxvf /home/poc5/${PROJECT}/${GROUP}.tar.gz -C /home/poc5/${PROJECT}
sshpass -e ssh -p ${PORT} -o stricthostkeychecking=no ${USER}@${HOST} rm /home/poc5/${PROJECT}/${GROUP}.tar.gz
