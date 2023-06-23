/** Represents the metadata of an image. */
type ImageMetadata = {
  /** The ID of this image. */
  id: string;
  /** The alternate text of this image. */
  alt?: string;
  /** The size of this image. */
  size?: { width: number; height: number };
  /**
   * The MIME type of this image.
   *
   * @example
   *   {contentType: 'image/png';}
   */
  contentType?: string;
};

export default ImageMetadata;
