#!/bin/bash
echo "Введите ваше имя: "; read NAME
mkdir "$NAME" && echo "Привет, "$NAME"! Это твоя первая папка." > "$NAME"/welcome.txt

