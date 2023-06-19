---
categories:
  - til
tags:
  - aws
  - serverless
  - ffmpeg
date: 2023-04-15
title: Setting Up Ffmpeg As Lambda Layer
---

# how to set up `ffmpeg` as a lambda layer

## what i learned

how to add `ffmpeg` and `ffprobe` as a lambda layer to be used by lambda functions.

### Getting ffmpeg

```shell
# ffmpeg
wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz

# checksum
wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz.md5

md5sum -c ffmpeg-release-amd64-static.tar.xz.md5

# extract
tar xvf ffmpeg-release-amd64-static.tar.xz
```

**Side note**: i had to `brew install md5sha1sum` and `brew install wget` on my local laptop

### Creating Lambda Layer

1. create `ffmpeg/bin/`
2. copy `ffmpeg` into it
3. zip `ffmpeg/`

```shell
# Create bin/
mkdir -p ffmpeg/bin

# Copy ffmpeg
cp ffmpeg-6.0-amd64-static/ffmpeg ffmpeg/bin

# Zip directory
cd ffmpeg
zip -r ../ffmpeg.zip .
```

### Finally

Upload zip file as a lambda layer.

### Bonus

In my case I also included `ffprobe` as it's also required for `whisper`.

<!-- more -->
## how i learned

i've been using OpenAI's whisper and i want to set it up as a lambda function to transcribe files as they land on an S3 bucket.

## reference

- [AWS blog: "Processing User Generated Content using AWS Lambda and FFmpeg](https://aws.amazon.com/blogs/media/processing-user-generated-content-using-aws-lambda-and-ffmpeg/)
