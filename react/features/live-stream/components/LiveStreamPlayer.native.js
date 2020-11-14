import React, { Component } from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';

import { connect } from '../../base/redux';
import { ASPECT_RATIO_WIDE } from '../../base/responsive-ui/constants';
import { setToolboxVisible } from '../../toolbox/actions';

const webviewUserAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'; // eslint-disable-line max-len

/**
 * The type of the React {@link Component} props of {@link LiveStreamPlayer}.
 */
type Props = {

  /**
   * True if in landscape mode.
   *
   * @private
   */
  _isWideScreen: boolean,

  /**
   * The height of the player.
   *
   * @private
   */
  _playerHeight: number,

  /**
   * The width of the player.
   *
   * @private
   */
  _playerWidth: number,

  /**
   * The Redux dispatch function.
   */
  dispatch: Function,

  /**
   * Url of the video to be played.
   *
   * @private
   */
  videoUrl: string
};

/**
 *
 * Implements a React {@code Component} for showing a Live Stream video.
 *
 * @extends Component
 */
class LiveStreamPlayer extends Component<Props, *> {

  constructor(props: Props) {
    super(props);
    this.setWideScreenMode(props._isWideScreen);
  }

  componentDidUpdate(prevProps: Props) {
    const { _isWideScreen } = this.props;

    if (_isWideScreen !== prevProps._isWideScreen) {
      this.setWideScreenMode(_isWideScreen);
    }
  }

  render() {
    const {
      _playerHeight,
      _playerWidth,
      videoUrl
    } = this.props;

    return (
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center'
        }} >
        <View
          style={{
            width: _playerWidth,
            height: _playerHeight,
          }}
        >
          <WebView
            style={{
              backgroundColor: 'transparent'
            }}
            originWhitelist={['*']}
            bounces={false}
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
            scrollEnabled={false}
            allowsFullscreenVideo={false}
            javaScriptEnabled={true}
            userAgent={webviewUserAgent}
            source={{ uri: videoUrl }}
          />
        </View>
      </View>);
  }

  setWideScreenMode(isWideScreen) {
    this.props.dispatch(setToolboxVisible(!isWideScreen));
  }
}

function _mapStateToProps(state) {
  const responsiveUi = state['features/base/responsive-ui'];
  const { aspectRatio, clientHeight: screenHeight, clientWidth: screenWidth } = responsiveUi;
  const isWideScreen = aspectRatio === ASPECT_RATIO_WIDE;

  let playerHeight, playerWidth;

  if (isWideScreen) {
    playerHeight = screenHeight;
    playerWidth = playerHeight * 16 / 9;
  } else {
    playerWidth = screenWidth;
    playerHeight = playerWidth * 9 / 16;
  }

  return {
    _isWideScreen: isWideScreen,
    _playerHeight: playerHeight,
    _playerWidth: playerWidth,
  };
}

export default connect(_mapStateToProps)(LiveStreamPlayer);
