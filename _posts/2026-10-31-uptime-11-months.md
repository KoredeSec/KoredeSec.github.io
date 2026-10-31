---
title: "Uptime: 11 Months"
description: Nobody schedules downtime for themselves.
date: 2026-10-31 12:00:00 +0100
tags: [Life, SOC]
---

```text
$ uptime
 23:59:59 up 11 months,  1 user,  load average: 9.99, 9.99, 9.99
```

Every production system gets a maintenance window: a few hours on the calendar when you take the thing offline on purpose, patch it, and let it breathe. Anyone who has run infrastructure knows why. A system that never goes down for maintenance eventually goes down on its own, usually at 3 am and usually at the worst possible time.

I've planned those windows for servers. I've written runbooks for them. I've sat on calls watching a progress bar crawl while someone asks "is it back yet?" every two minutes.

I've never planned one for me.

{% include figure.html src="/assets/blog/uptime-11-months/eren-moving-forward.mp4" alt="Eren Yeager saying: Until then, I keep moving forward." %}

Someone asked me recently when I last properly rested. Not a lazy Sunday, not a long sleep after a deadline. Properly rested: a stretch of days where nothing was waiting for me.

I had to count back. November 2025. Almost a year.

It didn't feel like a year. It felt like one long to-do list with the dates rubbed off.

University started badly for me, the kind of start where you quietly wonder if you're in the wrong place. I spent the next few years climbing back, one semester at a time, and finished as a 4 pointer. A few of us built NACSS from nothing, and I got to serve it across two administrations. Certs. Events. Late planning meetings. Final-year research where I deployed LLM apps on AWS Bedrock just to break them, because apparently that's my idea of fun.

Every one of those was a good thing. I'd do all of them again. But none of them felt like an ending. Every milestone was just the entry ticket to the next one.

```text
$ systemctl status ibrahim
● ibrahim.service - Student, builder, analyst, side-project maintainer
     Loaded: loaded (/etc/life/ibrahim.service; enabled)
     Active: active (running) since Nov 2025
   Warnings: 11 months without a restart
```

I kept telling myself the pause was coming. After graduation. After I land a role. After this project ships.

I graduated. I got in. The pause never came. The next thing just showed up, and it looked so much like an opportunity that saying no to it felt like a mistake.

Now I'm at an MSSP, learning more in a month than I did in some semesters. The pace is real. The people are sharp. Every week there's a new tool, a new technique, or a new kind of incident I'd only ever read about.

In SOC work there's a thing called alert fatigue. When everything is flagged critical, you go numb. The hundredth "high severity" alert of the day doesn't hit like the first one did. It's not that you stop caring. Your brain just stops giving you the signal.

I didn't expect that to happen outside work. But that's exactly what my wins have started to feel like. I close one, and the queue refills. Something good happens and my first thought isn't "that's great", it's "okay, what's next?"

{% include figure.html src="/assets/blog/uptime-11-months/saitama-ok.mp4" alt="Saitama from One Punch Man, expressionless, with a speech bubble that says OK" %}

Then there's the side project.

It started small. I wanted to see if I could find phishing sites targeting Nigerians before they found their victims. That was it. No plan, no roadmap. Curiosity. A weekend thing.

Then I found one: a copy of a delivery company's website, sitting live on the internet, waiting for someone's details. I reported it, and within a day it was gone.

I kept refreshing the page to be sure. Somewhere out there, someone who would have typed their details into that page never will, and they'll never know it was there. Nobody would ever thank me for it, because nobody would ever know. And somehow that made it feel better, not worse.

That was the moment it stopped being a curiosity.

Then another. And another.

A fake bank. A page that asked people for the code their bank had just texted them, gone four minutes after I reported it. A hosting company whose servers were full of made-up banks. A fake portal "verifying" crude-oil allocations, the kind of page that convinces a buyer abroad that a deal is real. Each one taught me something about how these people work, and each one made the next one easier to spot.

Somewhere along the line it stopped being a weekend thing. More than thirty fake sites taken offline or blocked after our reports. Emails to companies I'd only ever seen on billboards. People asking about it. A mentor who believed in it before I fully did. Job descriptions for the first people who might join, which is a strange thing to write for a project that started on a Saturday.

And the nights. Checking a suspicious site on my phone at 8 pm. Writing reports until my eyes gave up. Waking up to see whether something I'd reported had gone dark overnight. It's bigger now than anything I set out to build, and some days I look at how far it has come and can't quite believe it.

But a lab can wait until Saturday. Something protecting real people can't. Phishers don't keep office hours, so neither did I.

{% include figure.html src="/assets/blog/uptime-11-months/friday-night.jpg" alt="A blurred monitoring dashboard on a dark screen, headed: Monitor, What is happening now" caption="Friday night." tall=true %}

Here's the part that's hard to explain.

I'm not trying to escape any of this. I'm not burnt out and dramatic about it, and I'm not quitting anything. I love it. I love the moment a fake page goes down. I love the first reply from a provider that says "we've taken action." I love that something I started out of curiosity is actually helping people I'll never meet.

But loving the work doesn't mean you never get tired of working.

Those two things can sit side by side. I used to think being tired meant I'd picked the wrong thing. If I really loved it, it wouldn't drain me. That's not true. The things you care about the most are often the ones that take the most out of you, exactly because you care.

{% include figure.html src="/assets/blog/uptime-11-months/eren-tatakae.mp4" alt="Young Eren Yeager shouting Tatakae as he transforms" %}

I don't want to stop building. I want to stop feeling like I always have to be.

There's a difference between a fire you choose to keep going and one you're scared to let go out. For a while now, I think I've been doing the second and calling it the first.

I don't have the secret to balance. I've read the threads and watched the videos. Everyone has a system, and most of them look great until Monday. I'm ambitious, I want to build things that matter here, and I'm tired. All three are true at once, and I haven't figured out how to hold them yet.

Maybe that's fine. Maybe you don't solve it once. Maybe you just schedule the window, take the system down for a bit, and bring it back up a little healthier than before. Then you do it again next time, before it goes down on its own.

> "Almost everything will work again if you unplug it for a few minutes, including you."
>
> <cite>Anne Lamott</cite>

So this is me writing it into the calendar. Not because I've fixed anything. Just so that a year from now, I can look back and remember exactly where I was: proud, busy, a bit numb, and finally willing to admit it.

And if you're reading this from the middle of your own long to-do list, schedule yours too. Not after the next milestone. Not after the next promotion. Now. The queue will still be there on Monday, I promise. Mine always is.

It's Saturday. I'm closing the laptop.

```text
$ sudo shutdown -h now
Broadcast message from ibrahim:
The system is going down for maintenance NOW.
Scheduled downtime starts now.
```

Probably.

{% include figure.html src="/assets/blog/uptime-11-months/the-sea.mp4" alt="Eren, Armin and Mikasa standing in the sea, under a bright sky full of clouds" %}
