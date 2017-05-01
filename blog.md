---
layout: grid
title: Welcome to the STEAM Camp blog
kind: learn
permalink: /blog/

---

<ul class="grid {{ page.kind }}">
  {% for post in site.posts %}
<li class="{{ post.kind }} hvr-bounce-in" style="background: white url('{% asset_path {{post.image_tile}} %}') no-repeat top center;">
    <a href="{{ post.url }}" class="a"></a>
    <div class="text">
        <a href="{{ post.url }}">
            <div class="inner">
                <h3>{{ post.title }}</h3>
                <p class="excerpt">by {{ post.author}}, {{ post.date | date: '%B %d, %Y' }}<br>{{ post.excerpt }}</p>
            </div>
        </a>
    </div>
</li>
  {% endfor %}
</ul>
