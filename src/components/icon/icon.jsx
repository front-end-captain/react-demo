import React from "react";
import {
  FaFileImage,
  FaRegCopy,
  FaHeart,
  FaFileWord,
  FaImages,
  FaArrowDown,
  FaArrowUp,
  FaEye,
} from "react-icons/fa";
import { MdRedo, MdUndo, MdDelete, MdDeleteForever, MdRotate90DegreesCcw } from "react-icons/md";

export const InsertImageIcon = (props) => <FaFileImage {...props} />;
export const TemplateIcon = (props) => <FaRegCopy {...props} />;
export const DecorateIcon = (props) => <FaHeart {...props} />;
export const TextIcon = (props) => <FaFileWord {...props} />;
export const LayerIcon = (props) => <FaImages {...props} />;
export const RedoIcon = (props) => <MdRedo {...props} />;
export const UndoIcon = (props) => <MdUndo {...props} />;
export const DownIcon = (props) => <FaArrowDown {...props} />;
export const UpIcon = (props) => <FaArrowUp {...props} />;
export const PreviewIcon = (props) => <FaEye {...props} />;
export const DeleteIcon = (props) => <MdDelete {...props} />;
export const ClearIcon = (props) => <MdDeleteForever {...props} />;
export const RotateIcon = (props) => <MdRotate90DegreesCcw {...props} />;
// export const reversImageIcon = (props) => props;
