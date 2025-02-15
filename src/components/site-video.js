import { useEffect, useRef, useState } from 'react';
import SiteImage from '@/components/site-image';
import { motion, AnimatePresence } from 'framer-motion';
import Play from '@/assets/svgs/play.svg?inline';
import cn from '@/assets/js/cn';

export default function SiteVideo({
  className,
  videoType = '',
  externalVideo = {},
  directVideoUrl = '',
  options = {},
  thumbnail = {},
}) {


  /*
    HOW TO USE THIS COMPONENT

    SiteVideo is intended to work with direct Vimeo mp4 links, self hosted videos, or YouTube videos. Vimeo is recommended.
    In order to use Vimeo, the client will need a specific type of Vimeo subscription.
    Read the link here for more info, and we recommend adding the link to this guide to the URL field's help text:
    https://help.vimeo.com/hc/en-us/articles/12426150952593-Direct-links-to-video-files

    For a Vimeo set up, you'll need to use a single line text field (set the validation to URL).
    For self hosted, use a media upload field (make sure you set the validation to Video types) and query the URL.
    For YouTube, use a media field with the URL embed type.
    For all of the above types, if a thumbnail is required (if the video will not be autoplaying) just use a regular image field
    and query like you would for a SiteImage.

    Example usage (looping background video, using a Vimeo link or self hosted video url):
      <SiteVideo
        options={{ autoplay: true, loop: true, hideControls: true }}
        directVideoUrl={videoUrl}
        videoType="direct"
        className="h-[500px] !w-[500px] !pb-0"
      />

    Example usage (with thumbnail, using a Vimeo link or self hosted video url):
      <SiteVideo
        directVideoUrl={videoUrl}
        videoType="direct"
        thumbnail={image}
      />

    Example usage (YouTube):
      <SiteVideo
        externalVideo={youtubeVideo}
        videoType="youtube"
        thumbnail={image}
      />
  */


  const videoRef = useRef(null);

  const youtubeUrl = `//www.youtube.com/embed/${externalVideo.providerUid}?rel=0`;

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (playing) {
      if (videoRef?.current) {
        videoRef.current.play();
      }
    }
  }, [playing]);

  return (
    <div className={cn('site-video', className)}>
      { /* --- Video ---*/ }

      {
        videoType === 'youtube' && (
          <iframe
            src={youtubeUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )
      }

      {
        videoType === 'direct' && directVideoUrl && (
          <video
            ref={videoRef}
            width="1920"
            height="1080"
            autoPlay={options?.autoplay ?? false}
            muted={options?.autoplay ?? false}
            controls={!options?.hideControls}
            loop={options?.loop ?? false}
          >
            <source
              src={directVideoUrl}
              type="video/mp4"
            />
          </video>
        )
      }

      { /* ---Thumbnail ---*/ }

      {
        thumbnail && (
          <AnimatePresence>
            {
              !playing && !options.autoplay && !options.background && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="thumbnail absolute left-0 top-0 h-full w-full opacity-100"
                  onClick={() => setPlaying(true)}
                >
                  {
                    thumbnail && (
                      <SiteImage
                        {...thumbnail}
                        mdWidth={1920}
                        smWidth={768}
                      />
                    )
                  }

                  <Play className="play w-[10%]"/>
                </motion.div>
              )
            }
          </AnimatePresence>
        )
      }

      <style jsx global>
        {
          `
      .site-video {
        overflow: hidden;
        position: relative;
        padding-bottom: 56.25%;

        iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        video {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

      .thumbnail {
        cursor: pointer;

        .play {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          fill: #000;
          color: #000;
          transition: color 0.25s;
        }

        &:hover {
          .play {
            fill: #fff;
            color: #fff;
          }
        }
      }
    }
    `
        }
      </style>
    </div>
  );
}
