#!/bin/sh
tmux \
    new-session -d\; \
    split-window -h 'cd app && yarn && yarn dev --host 0.0.0.0'\; \
    split-window -v 'ganache-cli -h 0.0.0.0 -p 7545 -i 5777 -s dhbw'\; \
    select-pane -t 0\; \
    attach
