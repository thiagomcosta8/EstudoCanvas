<?php

$data = $_POST["imagem"];

list($type, $data) = explode(';', $data);
list($base, $data) = explode(',', $data);

$data = base64_decode($data);

file_put_contents('imagem.png', $data);
file_put_contents('imagem.txt', $data);
