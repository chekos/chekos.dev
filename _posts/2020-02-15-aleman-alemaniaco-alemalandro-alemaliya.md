---
layout: post
title: "Alemán: Alemalacra Alemalandro Alemaliya"
description: "Antes de crear tacosdedatos intenté crear un blog de Hip Hop Latino-americano donde iba a analizar de una manera cuantitativa la calidad de discos y canciones."
toc: true
comments: true
image: images/posts_imgs/aleman_network_gif.gif
show_image: true
categories: [hip hop, aleman]
---

# Alemán: Alemalacra Alemalandro Alemaliya

## La historia
Antes de crear **tacosdedatos** intenté crear un blog de Hip Hop Latino-americano donde iba a analizar de una manera cuantitativa la calidad de discos y canciones. 

No llegó muy lejos, era en Square space y no era tan fácil escribir notas. Bueno, no tan fácil como lo es ahora que aprendí de blogs y sitios estáticos en GitHub. Aquí puedo escribir todo en mi celular y copiarlo a un archivo markdown directamente en GitHub y _voilà_ tengo un blog. 

El que haya fallado **elblogdehiphop** no significa que mi amor por el Hip Hop haya disminuido ni siquiera un poco. Según Spotify, mis artistas más reproducidos son, en orden:
1. Alemán
2. La Plebada
3. Gera MX
4. Remik González
5. West Gold

Esta nota es sobre el número uno: Alemán. 

Alemán ha sido uno de mis artistas favoritos desde la primera vez que lo escuché. En aquellos tiempos yo no sabía lo que se de Hip Hop pero muy dentro de mi sentía que Alemán era excelente en lo que hacía. No sabía que era eso todavía pero sabía que él era uno de los grandes. 

Hoy en día, uso la palabra **_flow_** para describir lo que diferencia Alemán de los demás. 

El genio de Alemán es saber que decir, cuando decirlo y como decirlo. No suena repetitivo, no suena forzado. En otra nota hablaremos más del flow de Aleman. 

Yo creo no soy el único que piensa esto de Alemán porque es de los pocos raperos mexicanos con más de un millón de seguidores en Spotify. 

El que sea popular ahora no significa que siempre lo fue. Alemán comenzó en la Mexamafia como Gera MX. Un grupo conocido por su calidad _hardcore_ y underground. Curiosamente ambos, Alemán y Gera MX son artistas muy exitosos el día de hoy y aunque se adentren en el mundo del trap y sonidos más populares no pierden el respeto como exponentes del Hip Hop mexicano. 

En mi mente existen estas conexiones entre todos estos artistas. Alemán con Gera MX por la Mexamafia. Pero Alemán ahora está en la Homegrown con La Banda Bastön, Yoga Fire, Fntxy, Cozy Cuz, Mike Díaz, Dee. Dee es parte de Hood P con MOF. Mike Díaz es Neverdie con el Eptos. La Banda Bastön es Vieja Guardia. Al Gera lo relaciono con Charles Ans pero Charles es Anestesia. Charles Ans tiene rolas con Taxi Dee (el nombre que Fntxy usa cuando produce). Fntxy ahora tiene el grupo La Plebada junto a Cozy Cuz quien va Bobby Bass cuando produce. Bobby Bass comenzó a agarrar más tracción cuando comenzó a trabajar con Alemán. 

Todos se conectan. En mi mente, por lo menos. Quería saber si los datos respaldaban mis pensamientos. 

Hace unas semanas encontré esta herramienta: [http://labs.polsys.net/playground/spotify/](http://labs.polsys.net/playground/spotify/)

La herramienta utiliza la API de Spotify para crear una red de artistas relacionados hasta dos niveles de separación. Es decir, cuando yo escribo Alemán en la caja de texto la herramienta va y busca todos los artistas relacionados a Alemán (nivel uno) y también busca los artistas relacionados esos artistas (nivel dos). 

{% include note.html content="Si te interesaría saber más de la metodología detrás de esta herramienta déjame un comentario en este post 🤓🎧" %}

Así se ve la red de Alemán
![]({{ site.url }}/assets/posts/aleman/red-de-artistas.jpg)

La herramienta tiene la opción de descargar los datos. Uno de los atributos de esos datos son las IDs únicas que Spotify le asigna a cada artista. Con estas IDs puedes utilizar la API de Spotify para obtener más información de cada artista como su índice de popularidad, cuántos seguidores tienen, sus canciones más populares y mucho más. 

Justo eso fue lo que hice para crear una visualización diferente. Sabiendo que el "universo" de mis datos es **artistas relacionados a Alemán hasta dos niveles de separación** puedo hacer preguntas como:
1. ¿cómo se compara la popularidad de Alemán con la de artistas relacionados?
2. ¿de qué géneros musicales vienen éstos artistas? 
3. ¿cuántos artistas relacionados a Alemán tienen más de un millón de seguidores?

Más que todo esto, quería una manera fácil de explorar estos datos. 

El resultado fue este Observable Notebook: [https://observablehq.com/@chekos/aleman-beeswarm-plot-using-spotify-data](https://observablehq.com/@chekos/aleman-beeswarm-plot-using-spotify-data)

{% include tip.html content="Esto se ve mejor en el Notebook y en tu computadora. No lo he 'optimizado' para móvil." %}

## La visualización
Hay solo 5 artistas (+ Alemán) con más de un millón de seguidores en Spotify:
1. Cartel de Santa 3.94M
2. El Komander 1.46M
3. Molotov 1.42M
4. Panteón Rococo 1.28M
5. Beret 1.15M
6. Alemán 1.08M

Muchos son artistas de rap y hip-hop pero también hay artistas de pop, rock en español, reggea y ska. 

Alemán está entre los más populares de este universo lo cual me estoy tomando la libertad de etiquetar como positivo. De alguna manera, este artista underground que llegó a esta altura le está abriendo la puerta a todos estos demás artistas con menos popularidad. Mínimo, Spotify los identifica como artistas relacionados y tal vez aparezcan en una de esas listas de reproducción automatizadas juntos 🤷🏻‍♂️


<iframe width="100%" height="1054" frameborder="0"
  src="https://observablehq.com/embed/@chekos/aleman-beeswarm-plot-using-spotify-data?cell=chart"></iframe>