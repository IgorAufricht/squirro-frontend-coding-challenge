function Link(props) {
  const url = new URL(props.url);

  return <a href={url.href}>{url.hostname}</a>;
}

export default Link;
