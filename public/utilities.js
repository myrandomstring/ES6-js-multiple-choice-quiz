function ce(ename,attrs)
{
    let e = document.createElement(ename);
    for (att in attrs)
    {
        e.setAttribute(att,attrs[att]);
    }

    return e;
}

function doFetch(pagename,command,params = {})
{
 		const f = fetch("controller.php", {
            'method':'POST',
            'headers': {
                'Content-Type':"application/json; charset=utf-8"
             },
            'body': JSON.stringify({'request':Object.assign({'pagename':pagename,'command':command},params)})
        });

		return f;
}

/**
 * @param {String} HTML representing a single element.
 * @param {Boolean} flag representing whether or not to trim input whitespace, defaults to true.
 * @return {Element | HTMLCollection | null}
 */
function fromhtml(html, trim = true)
{
  // Process the HTML string.
  html = trim ? html.trim() : html;
  if (!html) return null;

  // Then set up a new template element.
  const template = document.createElement('template');
  template.innerHTML = html;
  const result = template.content.children;

  // Then return either an HTMLElement or HTMLCollection,
  // based on whether the input HTML had one or more roots.
  if (result.length === 1) return result[0];
  return result;
}

