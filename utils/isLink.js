// eslint-disable-next-line no-useless-escape
const reg = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-]))?/;
const isLink = (link) => reg.test(link);

module.exports = { isLink, reg };
