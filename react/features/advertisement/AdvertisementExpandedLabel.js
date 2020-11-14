import React from 'react';
import { connect } from '../base/redux';
import { Text, Linking } from 'react-native';
import { ExpandedLabel } from '../base/label';

class AdvertisementExpandedLabel extends ExpandedLabel {
  _getLabel() {
    let html = this.props._content || 'Loading...';
    let index = 0;
    let list = [];
    let links = html.match(/\[[^\]]+\]\([^\)]+\)/g);
    if (!Array.isArray(links)) return (
      <Text
        key="0"
        style={{
          fontSize: 16,
          lineHeight: 24
        }}
        children={html} />
    );
    for (const link of links) {
      let idx = html.indexOf(link, index);
      if (idx > index) {
        list.push(<Text
          key={index + '-' + idx}
          style={{
            fontSize: 16,
            lineHeight: 24
          }}
          children={html.slice(index, idx)} />
        );
      }
      let arr = link.split('](');
      let txt = arr[0].slice(1);
      let url = arr[1].slice(0, -1);
      list.push(<Text
        key={idx + '-' + idx + link.length}
        style={{
          fontSize: 16,
          lineHeight: 24,
          fontWeight: 'bold',
          color: '#FFC400'
        }}
        onPress={() => Linking.openURL(url)}
        children={txt} />
      );
      index = idx + link.length;
    }
    return list;
  }
}

function _mapStateToProps(state) {
  const advertisement = state['features/advertisement'];

  return {
    _content: advertisement.content
  };
}

export default connect(_mapStateToProps)(AdvertisementExpandedLabel);