<?php
/******************************************************************************/
/*                                                                            */
/*                       __        ____                                       */
/*                 ___  / /  ___  / __/__  __ _____________ ___               */
/*                / _ \/ _ \/ _ \_\ \/ _ \/ // / __/ __/ -_|_-<               */
/*               / .__/_//_/ .__/___/\___/\_,_/_/  \__/\__/___/               */
/*              /_/       /_/                                                 */
/*                                                                            */
/*                                                                            */
/******************************************************************************/
/*                                                                            */
/* Titre          : Ecrire un texte sur une image                             */
/*                                                                            */
/* URL            : http://www.phpsources.org/scripts132-PHP.htm              */
/* Auteur         : Iron                                                      */
/* Date édition   : 12 Juil 2005                                              */
/* Website auteur : http://www.phpsources.org                                 */
/*                                                                            */
/******************************************************************************/
?>
Nom du fichier:
create_image.php

<?php 

$nom_image = "https://c1.staticflickr.com/8/7399/27312042922_1f61b75195_b.jpg";  // le nom de votre image avec l'extension jpeg
$texte = "test";  // Le texte que vous désirez écrire sur l'image

header ("Content-type: image/jpeg");
$image = imagecreatefromjpeg($nom_image);
$blanc = imagecolorallocate($image, 255, 255, 255);
imagestring($image, 5, 150, 150,$texte, $blanc);
imagejpeg($image);
?> 

<!-- 
C'est ici qu'on incorpore l'image. Donc ouvrez une page et placez la balise ci dessous
C'est donc la balise HTML classique IMG 
-->

<img src="create_image.php">
