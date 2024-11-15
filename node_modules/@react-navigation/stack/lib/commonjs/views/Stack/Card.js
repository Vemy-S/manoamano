"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Card = void 0;
var _color = _interopRequireDefault(require("color"));
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _CardAnimationContext = require("../../utils/CardAnimationContext.js");
var _getDistanceForDirection = require("../../utils/getDistanceForDirection.js");
var _getInvertedMultiplier = require("../../utils/getInvertedMultiplier.js");
var _memoize = require("../../utils/memoize.js");
var _GestureHandler = require("../GestureHandler");
var _CardSheet = require("./CardSheet.js");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == typeof e || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function () { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const GESTURE_VELOCITY_IMPACT = 0.3;
const TRUE = 1;
const FALSE = 0;

/**
 * The distance of touch start from the edge of the screen where the gesture will be recognized
 */
const GESTURE_RESPONSE_DISTANCE_HORIZONTAL = 50;
const GESTURE_RESPONSE_DISTANCE_VERTICAL = 135;
const useNativeDriver = _reactNative.Platform.OS !== 'web';
const hasOpacityStyle = style => {
  if (style) {
    const flattenedStyle = _reactNative.StyleSheet.flatten(style);
    return flattenedStyle.opacity != null;
  }
  return false;
};
let Card = exports.Card = /*#__PURE__*/function (_React$Component) {
  function Card(...args) {
    var _this;
    _classCallCheck(this, Card);
    _this = _callSuper(this, Card, [...args]);
    _defineProperty(_this, "isCurrentlyMounted", false);
    _defineProperty(_this, "isClosing", new _reactNative.Animated.Value(FALSE));
    _defineProperty(_this, "inverted", new _reactNative.Animated.Value((0, _getInvertedMultiplier.getInvertedMultiplier)(_this.props.gestureDirection, _this.props.direction === 'rtl')));
    _defineProperty(_this, "layout", {
      width: new _reactNative.Animated.Value(_this.props.layout.width),
      height: new _reactNative.Animated.Value(_this.props.layout.height)
    });
    _defineProperty(_this, "isSwiping", new _reactNative.Animated.Value(FALSE));
    _defineProperty(_this, "interactionHandle", void 0);
    _defineProperty(_this, "pendingGestureCallback", void 0);
    _defineProperty(_this, "lastToValue", void 0);
    _defineProperty(_this, "animate", ({
      closing,
      velocity
    }) => {
      const {
        transitionSpec,
        onOpen,
        onClose,
        onTransition,
        gesture
      } = _this.props;
      const toValue = _this.getAnimateToValue({
        ..._this.props,
        closing
      });
      _this.lastToValue = toValue;
      _this.isClosing.setValue(closing ? TRUE : FALSE);
      const spec = closing ? transitionSpec.close : transitionSpec.open;
      const animation = spec.animation === 'spring' ? _reactNative.Animated.spring : _reactNative.Animated.timing;
      _this.setPointerEventsEnabled(!closing);
      _this.handleStartInteraction();
      clearTimeout(_this.pendingGestureCallback);
      onTransition?.({
        closing,
        gesture: velocity !== undefined
      });
      animation(gesture, {
        ...spec.config,
        velocity,
        toValue,
        useNativeDriver,
        isInteraction: false
      }).start(({
        finished
      }) => {
        _this.handleEndInteraction();
        clearTimeout(_this.pendingGestureCallback);
        if (finished) {
          if (closing) {
            onClose();
          } else {
            onOpen();
          }
          if (_this.isCurrentlyMounted) {
            // Make sure to re-open screen if it wasn't removed
            _this.forceUpdate();
          }
        }
      });
    });
    _defineProperty(_this, "getAnimateToValue", ({
      closing,
      layout,
      gestureDirection,
      direction,
      preloaded
    }) => {
      if (!closing && !preloaded) {
        return 0;
      }
      return (0, _getDistanceForDirection.getDistanceForDirection)(layout, gestureDirection, direction === 'rtl');
    });
    _defineProperty(_this, "setPointerEventsEnabled", enabled => {
      const pointerEvents = enabled ? 'box-none' : 'none';
      _this.ref.current?.setPointerEvents(pointerEvents);
    });
    _defineProperty(_this, "handleStartInteraction", () => {
      if (_this.interactionHandle === undefined) {
        _this.interactionHandle = _reactNative.InteractionManager.createInteractionHandle();
      }
    });
    _defineProperty(_this, "handleEndInteraction", () => {
      if (_this.interactionHandle !== undefined) {
        _reactNative.InteractionManager.clearInteractionHandle(_this.interactionHandle);
        _this.interactionHandle = undefined;
      }
    });
    _defineProperty(_this, "handleGestureStateChange", ({
      nativeEvent
    }) => {
      const {
        direction,
        layout,
        onClose,
        onGestureBegin,
        onGestureCanceled,
        onGestureEnd,
        gestureDirection,
        gestureVelocityImpact
      } = _this.props;
      switch (nativeEvent.state) {
        case _GestureHandler.GestureState.ACTIVE:
          _this.isSwiping.setValue(TRUE);
          _this.handleStartInteraction();
          onGestureBegin?.();
          break;
        case _GestureHandler.GestureState.CANCELLED:
        case _GestureHandler.GestureState.FAILED:
          {
            _this.isSwiping.setValue(FALSE);
            _this.handleEndInteraction();
            const velocity = gestureDirection === 'vertical' || gestureDirection === 'vertical-inverted' ? nativeEvent.velocityY : nativeEvent.velocityX;
            _this.animate({
              closing: _this.props.closing,
              velocity
            });
            onGestureCanceled?.();
            break;
          }
        case _GestureHandler.GestureState.END:
          {
            _this.isSwiping.setValue(FALSE);
            let distance;
            let translation;
            let velocity;
            if (gestureDirection === 'vertical' || gestureDirection === 'vertical-inverted') {
              distance = layout.height;
              translation = nativeEvent.translationY;
              velocity = nativeEvent.velocityY;
            } else {
              distance = layout.width;
              translation = nativeEvent.translationX;
              velocity = nativeEvent.velocityX;
            }
            const closing = (translation + velocity * gestureVelocityImpact) * (0, _getInvertedMultiplier.getInvertedMultiplier)(gestureDirection, direction === 'rtl') > distance / 2 ? velocity !== 0 || translation !== 0 : _this.props.closing;
            _this.animate({
              closing,
              velocity
            });
            if (closing) {
              // We call onClose with a delay to make sure that the animation has already started
              // This will make sure that the state update caused by this doesn't affect start of animation
              _this.pendingGestureCallback = setTimeout(() => {
                onClose();

                // Trigger an update after we dispatch the action to remove the screen
                // This will make sure that we check if the screen didn't get removed so we can cancel the animation
                _this.forceUpdate();
              }, 32);
            }
            onGestureEnd?.();
            break;
          }
      }
    });
    // Memoize this to avoid extra work on re-render
    _defineProperty(_this, "getInterpolatedStyle", (0, _memoize.memoize)((styleInterpolator, animation) => styleInterpolator(animation)));
    // Keep track of the animation context when deps changes.
    _defineProperty(_this, "getCardAnimation", (0, _memoize.memoize)((interpolationIndex, current, next, layout, insetTop, insetRight, insetBottom, insetLeft) => ({
      index: interpolationIndex,
      current: {
        progress: current
      },
      next: next && {
        progress: next
      },
      closing: _this.isClosing,
      swiping: _this.isSwiping,
      inverted: _this.inverted,
      layouts: {
        screen: layout
      },
      insets: {
        top: insetTop,
        right: insetRight,
        bottom: insetBottom,
        left: insetLeft
      }
    })));
    _defineProperty(_this, "ref", /*#__PURE__*/React.createRef());
    return _this;
  }
  _inherits(Card, _React$Component);
  return _createClass(Card, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.preloaded) {
        this.animate({
          closing: this.props.closing
        });
      }
      this.isCurrentlyMounted = true;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      const {
        direction,
        layout,
        gestureDirection,
        closing
      } = this.props;
      const {
        width,
        height
      } = layout;
      if (width !== prevProps.layout.width) {
        this.layout.width.setValue(width);
      }
      if (height !== prevProps.layout.height) {
        this.layout.height.setValue(height);
      }
      if (gestureDirection !== prevProps.gestureDirection) {
        this.inverted.setValue((0, _getInvertedMultiplier.getInvertedMultiplier)(gestureDirection, direction === 'rtl'));
      }
      const toValue = this.getAnimateToValue(this.props);
      if (this.getAnimateToValue(prevProps) !== toValue || this.lastToValue !== toValue) {
        // We need to trigger the animation when route was closed
        // The route might have been closed by a `POP` action or by a gesture
        // When route was closed due to a gesture, the animation would've happened already
        // It's still important to trigger the animation so that `onClose` is called
        // If `onClose` is not called, cleanup step won't be performed for gestures
        this.animate({
          closing
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.gesture?.stopAnimation();
      this.isCurrentlyMounted = false;
      this.handleEndInteraction();
    }
  }, {
    key: "gestureActivationCriteria",
    value: function gestureActivationCriteria() {
      const {
        direction,
        layout,
        gestureDirection,
        gestureResponseDistance
      } = this.props;
      const enableTrackpadTwoFingerGesture = true;
      const distance = gestureResponseDistance !== undefined ? gestureResponseDistance : gestureDirection === 'vertical' || gestureDirection === 'vertical-inverted' ? GESTURE_RESPONSE_DISTANCE_VERTICAL : GESTURE_RESPONSE_DISTANCE_HORIZONTAL;
      if (gestureDirection === 'vertical') {
        return {
          maxDeltaX: 15,
          minOffsetY: 5,
          hitSlop: {
            bottom: -layout.height + distance
          },
          enableTrackpadTwoFingerGesture
        };
      } else if (gestureDirection === 'vertical-inverted') {
        return {
          maxDeltaX: 15,
          minOffsetY: -5,
          hitSlop: {
            top: -layout.height + distance
          },
          enableTrackpadTwoFingerGesture
        };
      } else {
        const hitSlop = -layout.width + distance;
        const invertedMultiplier = (0, _getInvertedMultiplier.getInvertedMultiplier)(gestureDirection, direction === 'rtl');
        if (invertedMultiplier === 1) {
          return {
            minOffsetX: 5,
            maxDeltaY: 20,
            hitSlop: {
              right: hitSlop
            },
            enableTrackpadTwoFingerGesture
          };
        } else {
          return {
            minOffsetX: -5,
            maxDeltaY: 20,
            hitSlop: {
              left: hitSlop
            },
            enableTrackpadTwoFingerGesture
          };
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      const {
        styleInterpolator,
        interpolationIndex,
        current,
        gesture,
        next,
        layout,
        insets,
        overlay,
        overlayEnabled,
        shadowEnabled,
        gestureEnabled,
        gestureDirection,
        pageOverflowEnabled,
        children,
        containerStyle: customContainerStyle,
        contentStyle,
        /* eslint-disable @typescript-eslint/no-unused-vars */
        closing,
        direction,
        gestureResponseDistance,
        gestureVelocityImpact,
        onClose,
        onGestureBegin,
        onGestureCanceled,
        onGestureEnd,
        onOpen,
        onTransition,
        transitionSpec,
        /* eslint-enable @typescript-eslint/no-unused-vars */
        ...rest
      } = this.props;
      const interpolationProps = this.getCardAnimation(interpolationIndex, current, next, layout, insets.top, insets.right, insets.bottom, insets.left);
      const interpolatedStyle = this.getInterpolatedStyle(styleInterpolator, interpolationProps);
      const {
        containerStyle,
        cardStyle,
        overlayStyle,
        shadowStyle
      } = interpolatedStyle;
      const handleGestureEvent = gestureEnabled ? _reactNative.Animated.event([{
        nativeEvent: gestureDirection === 'vertical' || gestureDirection === 'vertical-inverted' ? {
          translationY: gesture
        } : {
          translationX: gesture
        }
      }], {
        useNativeDriver
      }) : undefined;
      const {
        backgroundColor
      } = _reactNative.StyleSheet.flatten(contentStyle || {});
      const isTransparent = typeof backgroundColor === 'string' ? (0, _color.default)(backgroundColor).alpha() === 0 : false;
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_CardAnimationContext.CardAnimationContext.Provider, {
        value: interpolationProps,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
          style: {
            // This is a dummy style that doesn't actually change anything visually.
            // Animated needs the animated value to be used somewhere, otherwise things don't update properly.
            // If we disable animations and hide header, it could end up making the value unused.
            // So we have this dummy style that will always be used regardless of what else changed.
            opacity: current
          }
          // Make sure that this view isn't removed. If this view is removed, our style with animated value won't apply
          ,
          collapsable: false
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          pointerEvents: "box-none"
          // Make sure this view is not removed on the new architecture, as it causes focus loss during navigation on Android.
          // This can happen when the view flattening results in different trees - due to `overflow` style changing in a parent.
          ,
          collapsable: false,
          ...rest,
          children: [overlayEnabled ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            pointerEvents: "box-none",
            style: _reactNative.StyleSheet.absoluteFill,
            children: overlay({
              style: overlayStyle
            })
          }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
            style: [styles.container, containerStyle, customContainerStyle],
            pointerEvents: "box-none",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_GestureHandler.PanGestureHandler, {
              enabled: layout.width !== 0 && gestureEnabled,
              onGestureEvent: handleGestureEvent,
              onHandlerStateChange: this.handleGestureStateChange,
              ...this.gestureActivationCriteria(),
              children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Animated.View, {
                needsOffscreenAlphaCompositing: hasOpacityStyle(cardStyle),
                style: [styles.container, cardStyle],
                children: [shadowEnabled && shadowStyle && !isTransparent ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
                  style: [styles.shadow, gestureDirection === 'horizontal' ? [styles.shadowHorizontal, styles.shadowStart] : gestureDirection === 'horizontal-inverted' ? [styles.shadowHorizontal, styles.shadowEnd] : gestureDirection === 'vertical' ? [styles.shadowVertical, styles.shadowTop] : [styles.shadowVertical, styles.shadowBottom], {
                    backgroundColor
                  }, shadowStyle],
                  pointerEvents: "none"
                }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_CardSheet.CardSheet, {
                  ref: this.ref,
                  enabled: pageOverflowEnabled,
                  layout: layout,
                  style: contentStyle,
                  children: children
                })]
              })
            })
          })]
        })]
      });
    }
  }]);
}(React.Component);
_defineProperty(Card, "defaultProps", {
  shadowEnabled: false,
  gestureEnabled: true,
  gestureVelocityImpact: GESTURE_VELOCITY_IMPACT,
  overlay: ({
    style
  }) => style ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
    pointerEvents: "none",
    style: [styles.overlay, style]
  }) : null
});
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  },
  overlay: {
    flex: 1,
    backgroundColor: '#000'
  },
  shadow: {
    position: 'absolute',
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3
  },
  shadowHorizontal: {
    top: 0,
    bottom: 0,
    width: 3,
    shadowOffset: {
      width: -1,
      height: 1
    }
  },
  shadowStart: {
    start: 0
  },
  shadowEnd: {
    end: 0
  },
  shadowVertical: {
    start: 0,
    end: 0,
    height: 3,
    shadowOffset: {
      width: 1,
      height: -1
    }
  },
  shadowTop: {
    top: 0
  },
  shadowBottom: {
    bottom: 0
  }
});
//# sourceMappingURL=Card.js.map