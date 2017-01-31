# All files in the 'lib' directory will be loaded
# before nanoc starts compiling.
include Nanoc::Helpers::Rendering
def active_link(path) 
  if @item_rep and (@item_rep.path =~ /#{path}/)
    "active"
  else 
    ""
  end 
end 
