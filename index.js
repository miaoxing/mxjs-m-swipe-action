import {View} from '@fower/taro';
import {useState, useEffect} from 'react';
import Taro from '@tarojs/taro';
import './index.scss';

let counter = 0;
import PropTypes from 'prop-types';

const SwipeAction = ({index: indexProp, options = [], children}) => {
  const [startX, setStartX] = useState(0);
  const [moveX, setMoveX] = useState(0);
  const [actionWidth, setActionWidth] = useState(64);
  const [index] = useState(() => {
    if (typeof indexProp !== 'undefined') {
      return indexProp;
    } else {
      return counter++;
    }
  });

  // 自动获取宽度
  useEffect(() => {
    const query = Taro.createSelectorQuery();
    query.select('.mx-swipe-action-options-' + index).boundingClientRect(rect => {
      if (!rect) {
        return;
      }
      setActionWidth(rect.width);
    }).exec();
  }, []);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();

    let moveX = e.touches[0].clientX - startX;
    if (moveX > 0) {
      // 向右滑动，最多恢复到原始位置
      moveX = 0;
    }

    // 向左滑动，不超过操作区域宽度
    moveX = Math.max(-actionWidth, moveX);
    setMoveX(moveX);
  };

  const handleTouchEnd = () => {
    let value = Math.abs(moveX);
    // 超过一半，则显示完整的操作区域，否则关闭
    // 注意右划起步时，总是小于一半，会直接关闭操作区域
    if (value >= actionWidth / 2) {
      setMoveX(-actionWidth);
    } else {
      setMoveX(0);
    }
  };

  const handleClick = () => {
    setMoveX(0);
  };

  return (
    <View overflowHidden>
      <View
        className="mx-swipe-action-content"
        style={{
          'transform': 'translate3d(' + moveX + 'px, 0, 0)',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {/* 使用 View 包裹起来，确保子节点结构独立 */}
        <View>
          {children}
        </View>
        <View className={'mx-swipe-action-options mx-swipe-action-options-' + index} onClick={handleClick}>
          {options.map(({children, ...props}) => (
            <View px4 white toCenter {...props} key={children}>
              {children}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

SwipeAction.propTypes = {
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.array,
  children: PropTypes.node,
};

export default SwipeAction;
