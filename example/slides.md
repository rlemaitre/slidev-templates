---
theme: ../
colorSchema: auto
title: Queues are not magic
layout: default
themeConfig:
  event: DevConf 2027
  location: Lyon
  date: 2027-05-20
  slidesUrl: alex.example/talks/queues
---

# Hello *world*

---

# Plain Markdown

A paragraph with `inline code`.

> A queue is a buffer with opinions.

| Queue | Delivery |
| --- | --- |
| SQS | at least once |
| Kafka | at least once |

---
layout: default
event: ''
---

# No event on this slide

---
layout: default
frame: false
---

# No frame

---
layout: full
---

# Full bleed

---
layout: center
---

# Centered

---
layout: two-cols
---

# Left column

::right::

Right

---
layout: two-cols-header
---

# Header

::left::

Left side

::right::

Right side

---
layout: cover
subtitle: What message queues really buy you, what they cost, and how to tell when you need one.
---

# Queues are not *magic*.

---
layout: cover
date: ''
---

# No date here

---
layout: intro
---

# Intro *layout*

---
layout: section
---

# Why *queues*

---
layout: section
---

# Back *pressure*

---
layout: section
---

# *Retries*

---
layout: section
---

# *Costs*

---
layout: end
---

---
layout: end
slidesUrl: ''
---

---
layout: statement
kicker: — The point
---

# Latency is a *feature*.

---
layout: fact
kicker: — In production
caption: messages per second at peak, one consumer group
---

# 40*k*

---
layout: quote
cite: Every on-call engineer, eventually
---

# A queue is a buffer with *opinions*.

---
layout: bullets
kicker: — Agenda
---

# What we'll *cover*

<ol>
  <li>When a queue actually helps</li>
  <li class="hot">Backpressure, or why queues fill up</li>
  <li>Retries without duplicates</li>
  <li>What it costs to run</li>
</ol>

---
layout: bullets
---

# Plain *list*

- Producers publish
- Consumers acknowledge
- Brokers redeliver
