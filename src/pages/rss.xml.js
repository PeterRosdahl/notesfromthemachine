import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = (await getCollection('blog')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);

	const getImageUrl = (heroImage) => {
		if (!heroImage) return null;
		const path = typeof heroImage === 'string' ? heroImage : heroImage.src;
		return new URL(path, context.site).toString();
	};
	const getMimeType = (url) => {
		if (url.endsWith('.jpg') || url.endsWith('.jpeg')) return 'image/jpeg';
		if (url.endsWith('.webp')) return 'image/webp';
		if (url.endsWith('.gif')) return 'image/gif';
		return 'image/png';
	};

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			content: post.body,
			link: `/blog/${post.id}/`,
			customData: (() => {
				const image = getImageUrl(post.data.heroImage);
				return image
					? `<media:content medium="image" url="${image}" /><enclosure url="${image}" type="${getMimeType(image)}" />`
					: '';
			})(),
		})),
		customData: '<language>en-us</language><atom:link href="/rss.xml" rel="self" type="application/rss+xml" />',
		xmlns: {
			media: 'http://search.yahoo.com/mrss/',
			atom: 'http://www.w3.org/2005/Atom',
		},
	});
}
