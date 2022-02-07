<?php
$name = $_POST['name'];
$tel = $_POST['tel'];

$name = htmlspecialchars($name);
$tel = htmlspecialchars($tel);

$name = urldecode($name);
$tel = urldecode($tel);

$name = trim($name);
$tel = trim($tel);

if (mail("aleks_1994_1996@mail.ru",
"новое письмо",
"Имя: ".$name."\n".
"Телефон: ".$tel."\n".
"From: aleks.1994.1996@gmail.com \r\n"
)) {
  echo ('Письмо отправлено');
}

else {
  echo ('Ошибка при отправлении');
}
?>
